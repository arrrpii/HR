
function goBack() {
  alert("Going back to the previous page...");
}

document.addEventListener("DOMContentLoaded", () => {
  function updateFileName() {
    const fileInput = document.getElementById("cv");
    const fileNameSpan = document.getElementById("file-name");

    if (fileInput.files.length > 0) {
      fileNameSpan.textContent = fileInput.files[0].name;
    } else {
      fileNameSpan.textContent = "No file chosen";
    }
  }

  const continueBtn = document.getElementById("continueBtn");
  const profileForm = document.getElementById("profileForm");
  const fileInput = document.getElementById("cv");

  
  fileInput.addEventListener("change", updateFileName);

  continueBtn.addEventListener("click", () => {
    if (!profileForm.checkValidity()) {
      alert("Please fill out the required fields.");
      return;
    }

    const formData = new FormData(profileForm);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const birthDay = formData.get("birthDay");
    const sex = formData.get("sex");
    const cv = formData.get("cv");

    alert(
      `First Name: ${firstName}\nLast Name: ${lastName}\nBirth Day: ${birthDay}\nSex: ${sex}\nCV: ${
        cv ? cv.name : "No file attached"
      }`
    );
  });
});

