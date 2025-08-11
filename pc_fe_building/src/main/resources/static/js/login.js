document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const errorMessage = document.getElementById("errorMessage");
    errorMessage.style.display = "none";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        errorMessage.innerText = "Email and password are required.";
        errorMessage.style.display = "block";
        return;
    }

    // Basic email regex
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
        errorMessage.innerText = "Enter a valid email.";
        errorMessage.style.display = "block";
        return;
    }

    try {
        const response = await fetch("https://pcbuilder-546878159726.asia-east1.run.app/api/v1/accounts/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Save JWT token in localStorage
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("accountId", data.accountId);

            alert("Logged In!");
            window.location.href = `/user_profile`;
        } else {
            errorMessage.innerText = data.error || `Login failed (${response.status})`;
            errorMessage.style.display = "block";
        }
    } catch (err) {
        errorMessage.innerText = "Connection Failed: " + err.message;
        errorMessage.style.display = "block";
    }
});
