document.addEventListener("DOMContentLoaded", () => {
  // Tab switching logic
  const tabLinks = document.querySelectorAll(".tab-link");
  const tabContents = document.querySelectorAll(".tab-content");

  tabLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetTab = link.getAttribute("data-tab");

      // Remove 'active' class from all tabs and contents
      tabLinks.forEach((l) => l.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      // Add 'active' to the clicked tab and its corresponding content
      link.classList.add("active");
      document.getElementById(targetTab).classList.add("active");
    });
  });
});
