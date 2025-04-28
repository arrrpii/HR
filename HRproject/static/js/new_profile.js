// "Go Back" button behavior
function goBack() {
  alert("Going back to the previous page...");
  // window.history.back(); // Real app behavior
}

document.addEventListener("DOMContentLoaded", () => {
  const profileForm = document.getElementById("profileForm");
  const fileInput = document.getElementById("cv");
  const fileNameSpan = document.getElementById("file-name");

  // ✅ Update the file name when a file is chosen
  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      fileNameSpan.textContent = fileInput.files[0].name;
    } else {
      fileNameSpan.textContent = "No file chosen";
    }
  });

  profileForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent actual submit for demo

    if (!profileForm.checkValidity()) {
      alert("Please fill out the required fields.");
      return;
    }

    const formData = new FormData(profileForm);
    const firstName = formData.get("first_name"); // use correct name!
    const lastName = formData.get("last_name");
    const birthDate = formData.get("birth_date");
    const gender = formData.get("gender");
    const cv = formData.get("cv");

    alert(
      `First Name: ${firstName}\nLast Name: ${lastName}\nBirth Date: ${birthDate}\nGender: ${gender}\nCV: ${
        cv ? cv.name : "No file attached"
      }`
    );

    // Here you could send the formData to the server if needed
  });
});
