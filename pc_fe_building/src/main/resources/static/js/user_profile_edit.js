document.addEventListener("DOMContentLoaded", async () => {
    const saveBtn = document.getElementById("saveProfileBtn");
    const errorMessage = document.getElementById("error-message");

    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const emailInput = document.getElementById("email");

    const accountId = localStorage.getItem("accountId");
    const token = localStorage.getItem("jwt");

    // Load current user data
    if (accountId && token) {
        try {
            const res = await fetch(`https://pcbuilder-546878159726.asia-east1.run.app/api/v1/accounts/${accountId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (res.ok) {
                const user = await res.json();
                firstNameInput.value = user.firstname || "";
                lastNameInput.value = user.lastname || "";
                emailInput.value = user.email || "";
            } else {
                errorMessage.textContent = "Failed to load user information.";
            }
        } catch (err) {
            errorMessage.textContent = "Error loading profile: " + err.message;
        }
    } else {
        errorMessage.textContent = "Please login first.";
    }

    // Save changes
    saveBtn.addEventListener("click", async () => {
        errorMessage.textContent = "";

        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();

        if (!firstName || !lastName || !email) {
            errorMessage.textContent = "All fields are required.";
            return;
        }

        // ✅ Email syntax validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorMessage.textContent = "Please enter a valid email address.";
            return;
        }

        try {
            if (!token || !accountId) {
                errorMessage.textContent = "Please login first.";
                return;
            }

            const response = await fetch(`https://pcbuilder-546878159726.asia-east1.run.app/api/v1/accounts/${accountId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    firstname: firstName,
                    lastname: lastName,
                    email: email
                })
            });

            if (response.ok) {
                window.location.href = "/user_profile";
            } else {
                const text = await response.text();
                errorMessage.textContent = `Failed to update profile: ${response.status} - ${text}`;
            }
        } catch (error) {
            errorMessage.textContent = "Connection Error: " + error.message;
        }
    });
});
