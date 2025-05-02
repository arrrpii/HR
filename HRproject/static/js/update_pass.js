document.addEventListener("DOMContentLoaded", () => {
  const newPassword = document.getElementById("newPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  const passwordForm = document.getElementById("passwordForm");

  
  const lengthRequirement = document.getElementById("length");
  const numberRequirement = document.getElementById("number");
  const uppercaseRequirement = document.getElementById("uppercase");
  const lowercaseRequirement = document.getElementById("lowercase");

  
  newPassword.addEventListener("input", checkPassword);

 
  passwordForm.addEventListener("submit", (e) => {
    e.preventDefault();

    
    if (!checkPassword()) {
      alert("Please ensure your password meets all requirements.");
      return;
    }

   
    if (newPassword.value !== confirmPassword.value) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    
    alert("Password updated successfully!");
    passwordForm.reset();
  });

  function checkPassword() {
    const passwordValue = newPassword.value;
    let isValid = true;

    
    if (passwordValue.length >= 8) {
      lengthRequirement.classList.remove("invalid");
      lengthRequirement.classList.add("valid");
    } else {
      lengthRequirement.classList.remove("valid");
      lengthRequirement.classList.add("invalid");
      isValid = false;
    }

    
    if (/\d/.test(passwordValue)) {
      numberRequirement.classList.remove("invalid");
      numberRequirement.classList.add("valid");
    } else {
      numberRequirement.classList.remove("valid");
      numberRequirement.classList.add("invalid");
      isValid = false;
    }

    
    if (/[A-Z]/.test(passwordValue)) {
      uppercaseRequirement.classList.remove("invalid");
      uppercaseRequirement.classList.add("valid");
    } else {
      uppercaseRequirement.classList.remove("valid");
      uppercaseRequirement.classList.add("invalid");
      isValid = false;
    }

    
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
