const convictionSelect = document.getElementById("convictionSelect");
const convictionDetails = document.getElementById("convictionDetails");

const teachingSelect = document.getElementById("teachingSelect");
const teachingWhere = document.getElementById("teachingWhere");

convictionSelect.addEventListener("change", () => {
  if (convictionSelect.value === "yes") {
    convictionDetails.style.display = "block";
    convictionDetails.required = true;
  } else {
    convictionDetails.style.display = "none";
    convictionDetails.value = "";
    convictionDetails.required = false;
  }
});

teachingSelect.addEventListener("change", () => {
  if (teachingSelect.value === "yes") {
    teachingWhere.style.display = "block";
    teachingWhere.required = true;
  } else {
    teachingWhere.style.display = "none";
    teachingWhere.value = "";
    teachingWhere.required = false;
  }
});
