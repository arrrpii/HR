document.addEventListener("DOMContentLoaded", () => {
  const otpInputs = document.querySelectorAll(".otp");
  const otpForm = document.getElementById("otpForm");

  // Automatically move to the next field once a digit is entered
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      // If a character is entered, move to the next input
      if (input.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });

    // If backspace is pressed and the field is empty, move to the previous input
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && input.value.length === 0 && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });

  // Handle form submission
  otpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let otp = "";

    // Collect all OTP digits
    otpInputs.forEach((input) => {
      otp += input.value;
    });

    // Basic check to ensure all fields are filled
    if (otp.length < otpInputs.length) {
      alert("Please enter the full OTP.");
      return;
    }

    // Here you could send the OTP to your server for verification
    alert("OTP Submitted: " + otp);

    // Clear the inputs after submission
    otpInputs.forEach((input) => (input.value = ""));
    otpInputs[0].focus();
  });
});
