document.addEventListener("DOMContentLoaded", () => {
  const editBtn = document.getElementById("editBtn");
  const deleteBtn = document.getElementById("deleteBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const saveCancelButtons = document.getElementById("saveCancelButtons");
  const generalFormInputs = document.querySelectorAll("#generalForm input, #generalForm select");
  const jobFormInputs = document.querySelectorAll("#jobForm input, #jobForm select");

  editBtn.addEventListener("click", () => {
    generalFormInputs.forEach(input => (input.disabled = false));
    jobFormInputs.forEach(input => (input.disabled = false));
    saveCancelButtons.style.display = "block";
    editBtn.style.display = "none";
    deleteBtn.style.display = "none";
  });

  cancelBtn.addEventListener("click", () => {
    generalFormInputs.forEach(input => (input.disabled = true));
    jobFormInputs.forEach(input => (input.disabled = true));
    saveCancelButtons.style.display = "none";
    editBtn.style.display = "inline-block";
    deleteBtn.style.display = "inline-block";
  });

  deleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this employee?")) {
      fetch(`/delete_employee/${candidateId}`, { method: 'POST' })
        .then(response => {
          if (response.ok) {
            window.location.href = '/employees';
          } else {
            alert('Failed to delete employee');
          }
        });
    }
  });



  const tabLinks = document.querySelectorAll(".tab-link");
  const tabContents = document.querySelectorAll(".tab-content");

  tabLinks.forEach(link => {
    link.addEventListener("click", () => {
      tabLinks.forEach(l => l.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));
      link.classList.add("active");
      const tabId = link.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });
});

