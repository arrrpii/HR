// Simple placeholder for the "Go Back" button
function goBack() {
  alert("Going back to the previous page...");
  // In a real application, you might do:
  // window.history.back();
}

// Handle the Continue button
document.addEventListener("DOMContentLoaded", () => {
  const continueBtn = document.getElementById("continueBtn");
  const departmentForm = document.getElementById("departmentForm");

  continueBtn.addEventListener("click", () => {
    // Get the selected department
    const formData = new FormData(departmentForm);
    const selectedDepartment = formData.get("department");

    // For demonstration:
    alert("Selected department: " + selectedDepartment);

    // Here you could navigate to the next step of your process, e.g.:
    // window.location.href = "next-page.html";
  });
});