document.addEventListener("DOMContentLoaded", function() {
    const email = document.getElementById("email");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const signupBtn = document.querySelector(".signup-btn");

    // Function to check if all form fields are filled
    function checkFormValidity() {
        const isValid = email.value && username.value && password.value && confirmPassword.value && password.value === confirmPassword.value;
        signupBtn.disabled = !isValid;  // Enable/disable the button based on form validity
    }

    // Add event listeners to check the form fields whenever there is input or change
    email.addEventListener("input", checkFormValidity);
    username.addEventListener("input", checkFormValidity);
    password.addEventListener("input", checkFormValidity);
    confirmPassword.addEventListener("input", checkFormValidity);
});
