// "Go Back" button behavior (placeholder)
function goBack() {
  alert("Going back to the previous page...");
  // In a real application, you might do:
  // window.history.back();
}

document.addEventListener("DOMContentLoaded", () => {
  const continueBtn = document.getElementById("continueBtn");
  const profileForm = document.getElementById("profileForm");

  continueBtn.addEventListener("click", () => {
    // Check required fields
    if (!profileForm.checkValidity()) {
      alert("Please fill out the required fields.");
      return;
    }

    // Gather form data
    const formData = new FormData(profileForm);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const birthDay = formData.get("birthDay");
    const sex = formData.get("sex");
    const cv = formData.get("cv");

    // For demonstration, just alert the data
    alert(
      `First Name: ${firstName}\nLast Name: ${lastName}\nBirth Day: ${birthDay}\nSex: ${sex}\nCV: ${
        cv ? cv.name : "No file attached"
      }`
    );

    // In a real app, you'd send `formData` to the server or proceed to the next step
  });
});