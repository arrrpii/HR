document.addEventListener("DOMContentLoaded", function () {
  const profileToggle = document.querySelector(".profile-toggle");
  const profileMenu = document.getElementById("profileMenu");

  
  profileToggle.addEventListener("click", function (e) {
    e.stopPropagation(); 
    if (profileMenu.style.display === "block") {
      profileMenu.style.display = "none";
    } else {
      profileMenu.style.display = "block";
    }
  });

  
  window.addEventListener("click", function (e) {
    if (
      !profileMenu.contains(e.target) &&
      !profileToggle.contains(e.target)
    ) {
      profileMenu.style.display = "none";
    }
  });
});
