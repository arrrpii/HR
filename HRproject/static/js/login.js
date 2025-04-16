document.addEventListener("DOMContentLoaded", function () {
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");
  const loginButton = document.querySelector(".login-btn");

  // Function to check if email and password are filled
  function checkForm() {
    if (emailField.value && passwordField.value) {
      loginButton.disabled = false;  // Enable the button
    } else {
      loginButton.disabled = true;  // Disable the button
    }
  }

  // Check form as soon as email or password changes
  emailField.addEventListener("input", checkForm);
  passwordField.addEventListener("input", checkForm);

  // Prevent form submission if email or password is empty
  document.getElementById("login-form").addEventListener("submit", function (event) {
    if (!emailField.value || !passwordField.value) {
      alert("Please fill in both email and password!");
      event.preventDefault(); // Prevent form submission
    }
  });
});
