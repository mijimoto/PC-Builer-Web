// Use a separate key for chat history to avoid overwriting other localStorage items
const CHAT_STORAGE_KEY = "pc_recommend_chat_history";

// Load existing chat history or start fresh
let chatHistory = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY)) || [];

// DOM Elements
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSendBtn = document.getElementById("chat-send");

// Render chat history
function renderChat() {
    chatMessages.innerHTML = "";
    chatHistory.forEach(msg => {
        const div = document.createElement("div");
        div.classList.add("chat-message", msg.role);

        // If AI message, format it for easier reading
        if (msg.role === "ai") {
            div.innerHTML = formatAIResponse(msg.content);
        } else {
            div.textContent = msg.content;
        }

        chatMessages.appendChild(div);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Save chat history to localStorage
function saveChat() {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatHistory));
}

// Format AI responses into a neat spec card style
function formatAIResponse(text) {
    // Bold titles
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Keywords for PC build
    const keywords = [
        "Processor", "Motherboard", "Graphics Card", "GPU", "Memory", "RAM",
        "Storage", "Power Supply", "Case", "Keyboard", "Mouse", "Headset", "Total cost"
    ];

    // Add line breaks & icons for readability
    keywords.forEach(word => {
        const regex = new RegExp(`(${word}:)`, "gi");
        text = text.replace(regex, `<div class="spec-line">💠 <strong>$1</strong>`);
    });

    // Close the spec-line divs
    text = text.replace(/(\n|$)/g, "</div>");

    // Wrap in styled card
    return `<div class="ai-spec-card">${text}</div>`;
}

// Send a message to ApiFreeLLM
async function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    // Add user message
    chatHistory.push({ role: "user", content: userMessage });
    saveChat();
    renderChat();

    chatInput.value = "";
    chatInput.disabled = true;
    chatSendBtn.disabled = true;

    try {
        const res = await fetch("https://apifreellm.com/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await res.json();
        let aiReply = data.response || "Error: No response from API.";

        chatHistory.push({ role: "ai", content: aiReply });
        saveChat();
        renderChat();
    } catch (err) {
        chatHistory.push({ role: "ai", content: "Error: " + err.message });
        saveChat();
        renderChat();
    } finally {
        chatInput.disabled = false;
        chatSendBtn.disabled = false;
        chatInput.focus();
    }
}

// Event listeners
chatSendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
});

// Initial render
renderChat();
