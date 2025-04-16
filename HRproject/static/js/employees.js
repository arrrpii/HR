document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const employeeTable = document.getElementById("employeeTable").getElementsByTagName("tbody")[0];

  // Simple search/filter functionality
  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    const rows = employeeTable.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
      const rowText = rows[i].innerText.toLowerCase();
      rows[i].style.display = rowText.includes(filter) ? "" : "none";
    }
  });
});
