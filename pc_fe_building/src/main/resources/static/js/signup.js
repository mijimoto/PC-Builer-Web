document.getElementById("signupForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const errorMessage = document.getElementById("errorMessage");
    errorMessage.style.display = "none";

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!firstName || !email || !password) {
        errorMessage.innerText = "Please fill out all required fields.";
        errorMessage.style.display = "block";
        return;
    }

    // Gmail-only email regex
    const emailRegex = /^[\w-\.]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
        errorMessage.innerText = "Please enter a valid Gmail address.";
        errorMessage.style.display = "block";
        return;
    }

    try {
        const response = await fetch("https://pcbuilder-546878159726.asia-east1.run.app/api/v1/accounts/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstname: firstName,
                lastname: lastName,
                email: email,
                passwordhased: password
            })
        });

        if (response.ok) {
            alert("Check your email. We have sent a verification mail.");
            window.location.href = "/login";
        } else {
            errorMessage.innerText = "Registration failed.";
            errorMessage.style.display = "block";
        }
    } catch (err) {
        errorMessage.innerText = "Connection Failed: " + err.message;
        errorMessage.style.display = "block";
    }
});
