document.addEventListener("DOMContentLoaded", () => {
  const newPassword = document.getElementById("newPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  const passwordForm = document.getElementById("passwordForm");

  // Requirement elements
  const lengthRequirement = document.getElementById("length");
  const numberRequirement = document.getElementById("number");
  const uppercaseRequirement = document.getElementById("uppercase");
  const lowercaseRequirement = document.getElementById("lowercase");

  // Listen for input on the "newPassword" field
  newPassword.addEventListener("input", checkPassword);

  // Handle form submission
  passwordForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Check if new password meets all requirements
    if (!checkPassword()) {
      alert("Please ensure your password meets all requirements.");
      return;
    }

    // Check if the confirmation matches the new password
    if (newPassword.value !== confirmPassword.value) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // If all validations pass, you can proceed with form submission
    alert("Password updated successfully!");
    passwordForm.reset();
  });

  function checkPassword() {
    const passwordValue = newPassword.value;
    let isValid = true;

    // Check length >= 8
    if (passwordValue.length >= 8) {
      lengthRequirement.classList.remove("invalid");
      lengthRequirement.classList.add("valid");
    } else {
      lengthRequirement.classList.remove("valid");
      lengthRequirement.classList.add("invalid");
      isValid = false;
    }

    // Check for a digit
    if (/\d/.test(passwordValue)) {
      numberRequirement.classList.remove("invalid");
      numberRequirement.classList.add("valid");
    } else {
      numberRequirement.classList.remove("valid");
      numberRequirement.classList.add("invalid");
      isValid = false;
    }

    // Check for an uppercase letter
    if (/[A-Z]/.test(passwordValue)) {
      uppercaseRequirement.classList.remove("invalid");
      uppercaseRequirement.classList.add("valid");
    } else {
      uppercaseRequirement.classList.remove("valid");
      uppercaseRequirement.classList.add("invalid");
      isValid = false;
    }

    // Check for a lowercase letter
    if (/[a-z]/.test(passwordValue)) {
      lowercaseRequirement.classList.remove("invalid");
      lowercaseRequirement.classList.add("valid");
    } else {
      lowercaseRequirement.classList.remove("valid");
      lowercaseRequirement.classList.add("invalid");
      isValid = false;
    }

    return isValid;
  }
});
