document.addEventListener("DOMContentLoaded", async () => {
    const errorMessage = document.getElementById("error-message");

    try {
        const accountId = localStorage.getItem("accountId");
        const token = localStorage.getItem("jwt");
        if (!token || !accountId) {
            errorMessage.textContent = "Please login first.";
            return;
        }

        const response = await fetch(`https://pcbuilder-546878159726.asia-east1.run.app/api/v1/accounts/${accountId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById("username-title").textContent = data.firstname || "UserName";
            document.getElementById("firstNameDisplay").querySelector("span").textContent = data.firstname || "";
            document.getElementById("lastNameDisplay").querySelector("span").textContent = data.lastname || "";
            document.getElementById("emailDisplay").querySelector("span").textContent = data.email || "";
        } else {
            const text = await response.text();
            errorMessage.textContent = `Failed to fetch user data: ${response.status} - ${text}`;
        }
    } catch (error) {
        errorMessage.textContent = "Connection Error: " + error.message;
    }

    // Logout logic
    document.getElementById("logoutBtn").addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("jwt");
            if (!token) {
                localStorage.removeItem("jwt");
                localStorage.removeItem("accountId");
                window.location.href = "/login";
                return;
            }

            const response = await fetch("https://pcbuilder-546878159726.asia-east1.run.app/api/v1/accounts/logout", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            localStorage.removeItem("jwt");
            localStorage.removeItem("accountId");
            window.location.href = "/login";
        } catch (error) {
            errorMessage.textContent = "Logout Error: " + error.message;
        }
    });
            e.preventDefault();
        const confirmed = confirm('Are you sure you want to log out?');
        if (confirmed) {
            // Redirect to logout endpoint or handle logout
            window.location.href = '/logout'; // change if your logout URL is different
        }
});
