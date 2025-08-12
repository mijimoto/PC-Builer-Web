document.getElementById("forgotPasswordForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const errorMessage = document.getElementById("errorMessage");
    const sendBtn = document.getElementById("sendBtn");

    errorMessage.style.display = "none";

    const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email || !emailRegex.test(email)) {
        errorMessage.innerText = "Please enter a valid email";
        errorMessage.style.display = "block";
        return;
    }

    sendBtn.disabled = true;
    sendBtn.innerText = "Sending...";

    try {
        const apiUrl = `https://pcbuilder-546878159726.asia-east1.run.app/api/v1/accounts/reset-password/request?email=${encodeURIComponent(email)}`;
        
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
            const raw = await response.text();
            let token = null;

            try {
                const data = JSON.parse(raw);
                token = data.token || data.Token || null;
            } catch (err) {
                console.log("Server returned plain text:", raw);
            }

            if (token) {
                alert("Check your email for a verification token");
                window.location.href = `/reset-password?token=${encodeURIComponent(token)}`;
            } else {
                alert("Check your email for reset instructions");
                window.location.href = "/login";
            }
        } else {
            const errorText = await response.text();
            errorMessage.innerText = `Failed to request reset: ${errorText || response.status}`;
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
