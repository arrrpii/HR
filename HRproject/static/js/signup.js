document.addEventListener("DOMContentLoaded", () => {
    const email = document.getElementById("email");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const signupBtn = document.querySelector(".signup-btn");

    const lengthRequirement = document.getElementById("length");
    const numberRequirement = document.getElementById("number");
    const uppercaseRequirement = document.getElementById("uppercase");
    const lowercaseRequirement = document.getElementById("lowercase");

    password.addEventListener("input", () => {
        checkPassword();
        checkFormValidity();
    });

    confirmPassword.addEventListener("input", checkFormValidity);
    email.addEventListener("input", checkFormValidity);
    username.addEventListener("input", checkFormValidity);

    function checkPassword() {
        const val = password.value;
        let valid = true;

        // Length
        if (val.length >= 8) {
            lengthRequirement.classList.add("valid");
            lengthRequirement.classList.remove("invalid");
        } else {
            lengthRequirement.classList.add("invalid");
            lengthRequirement.classList.remove("valid");
            valid = false;
        }

        // Number
        if (/\d/.test(val)) {
            numberRequirement.classList.add("valid");
            numberRequirement.classList.remove("invalid");
        } else {
            numberRequirement.classList.add("invalid");
            numberRequirement.classList.remove("valid");
            valid = false;
        }

        // Uppercase
        if (/[A-Z]/.test(val)) {
            uppercaseRequirement.classList.add("valid");
            uppercaseRequirement.classList.remove("invalid");
        } else {
            uppercaseRequirement.classList.add("invalid");
            uppercaseRequirement.classList.remove("valid");
            valid = false;
        }

        // Lowercase
        if (/[a-z]/.test(val)) {
            lowercaseRequirement.classList.add("valid");
            lowercaseRequirement.classList.remove("invalid");
        } else {
            lowercaseRequirement.classList.add("invalid");
            lowercaseRequirement.classList.remove("valid");
            valid = false;
        }

        return valid;
    }

    function checkFormValidity() {
        const allFilled = email.value && username.value && password.value && confirmPassword.value;
        const passwordsMatch = password.value === confirmPassword.value;
        const passwordValid = checkPassword();
        signupBtn.disabled = !(allFilled && passwordsMatch && passwordValid);
    }
});
