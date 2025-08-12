document.getElementById("forgotPasswordForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const errorMessage = document.getElementById("errorMessage");
    const sendBtn = document.getElementById("sendBtn");

    errorMessage.style.display = "none";

    // Validate email
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email || !emailRegex.test(email)) {
        errorMessage.innerText = "Please enter a valid email";
        errorMessage.style.display = "block";
        return;
    }

    
    // Disable button and show loading
    sendBtn.disabled = true;
    sendBtn.innerText = "Sending...";

    try {
        const apiUrl = `https://pcbuilder-546878159726.asia-east1.run.app/api/v1/accounts/reset-password/request?email=${encodeURIComponent(email)}`;
        
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        const contentType = response.headers.get("content-type");

        if (response.ok) {
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                const token = data.token || data.Token;

                if (token) {
                    alert("Check your email for a verification token");
                    window.location.href = `/reset-password?token=${encodeURIComponent(token)}`;
                } else {
                    alert("Check your email for reset instructions");
                    window.location.href = "/login";
                }
            } else {
                alert("Check your email for reset instructions");
                window.location.href = "/login";
            }
        } else {
            errorMessage.innerText = `Failed to request reset. Status: ${response.status}`;
            errorMessage.style.display = "block";
        }
    } catch (err) {
        errorMessage.innerText = "Connection Error: " + err.message;
        errorMessage.style.display = "block";
    } finally {
        sendBtn.disabled = false;
        sendBtn.innerText = "Send Reset Link";
    }
});
