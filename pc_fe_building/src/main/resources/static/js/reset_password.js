document.addEventListener("DOMContentLoaded", () => {
    const tokenInput = document.getElementById("tokenInput");
    const newPasswordInput = document.getElementById("newPasswordInput");
    const errorMsg = document.getElementById("errorMsg");
    const loadingIndicator = document.getElementById("loading");
    const form = document.getElementById("forgotForm");

    // Get token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
        tokenInput.value = token;
    } else {
        errorMsg.textContent = "Invalid reset link (token missing)";
        document.getElementById("submitBtn").disabled = true;
        return;
    }

	form.addEventListener("submit", async (event) => {
	    event.preventDefault();

	    const newPassword = newPasswordInput.value.trim();
	    if (!newPassword) {
	        errorMsg.textContent = "Please enter a new password";
	        return;
	    }

	    errorMsg.textContent = "";
	    loadingIndicator.style.display = "block";

	    try {
	        const formData = new URLSearchParams();
	        formData.append("token", token);
	        formData.append("newPassword", newPassword);

	        const response = await fetch(
	            "https://pcbuilder-546878159726.asia-east1.run.app/api/v1/accounts/reset-password",
	            {
	                method: "POST",
	                headers: {
	                    "Content-Type": "application/x-www-form-urlencoded",
	                    "Accept": "application/json"
	                },
	                body: formData.toString()
	            }
	        );

	        const responseText = await response.text();
	        console.log("Response:", response.status, responseText);

	        if (response.ok) {
	            alert("Password reset successfully. You can now log in.");
	            window.location.href = "/login";
	        } else {
	            errorMsg.textContent = `Failed to reset password: ${responseText}`;
	        }
	    } catch (err) {
	        errorMsg.textContent = "Connection error: " + err.message;
	    } finally {
	        loadingIndicator.style.display = "none";
	    }
	});
});
