const educationForm = document.getElementById("educationForm");
const educationGroup = document.querySelector(".education-group");
const addButton = document.getElementById("addEducation");

addButton.addEventListener("click", () => {
  const newGroupWrapper = document.createElement("div");
  newGroupWrapper.classList.add("education-entry");

  const newGroup = document.createElement("div");
  newGroup.innerHTML = `
    <input type="text" placeholder="University" required />
    <input type="text" placeholder="Faculty" required />
    <input type="text" placeholder="Bachelor Degree" required />
  `;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.type = "button";
  removeButton.classList.add("remove-btn");

  removeButton.addEventListener("click", () => {
    educationGroup.removeChild(newGroupWrapper);
  });

  newGroupWrapper.appendChild(document.createElement("hr"));
  newGroupWrapper.appendChild(newGroup);
  newGroupWrapper.appendChild(removeButton);

  educationGroup.appendChild(newGroupWrapper);
});
