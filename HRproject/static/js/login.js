document.addEventListener("DOMContentLoaded", function () {
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");
  const loginButton = document.querySelector(".login-btn");

  // Function to check if email and password are filled
  function checkForm() {
    if (emailField.value && passwordField.value) {
      loginButton.disabled = false;  
    } else {
      loginButton.disabled = true; 
    }
  }

  
  emailField.addEventListener("input", checkForm);
  passwordField.addEventListener("input", checkForm);

  
  document.getElementById("login-form").addEventListener("submit", function (event) {
    if (!emailField.value || !passwordField.value) {
      alert("Please fill in both email and password!");
      event.preventDefault(); 
    }
  });
});
