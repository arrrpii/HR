document.addEventListener("DOMContentLoaded", function () {
  const profileToggle = document.querySelector(".profile-toggle");
  const profileMenu = document.getElementById("profileMenu");

  // Toggle dropdown on button click
  profileToggle.addEventListener("click", function (e) {
    e.stopPropagation(); // prevent event from reaching window
    if (profileMenu.style.display === "block") {
      profileMenu.style.display = "none";
    } else {
      profileMenu.style.display = "block";
    }
  });

  // Close dropdown when clicking outside
  window.addEventListener("click", function (e) {
    if (
      !profileMenu.contains(e.target) &&
      !profileToggle.contains(e.target)
    ) {
      profileMenu.style.display = "none";
    }
  });
});
