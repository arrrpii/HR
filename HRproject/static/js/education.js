const educationForm = document.getElementById("educationForm");
const educationGroup = document.querySelector(".education-group");
const addButton = document.getElementById("addEducation");

addButton.addEventListener("click", () => {
  const newGroupWrapper = document.createElement("div");
  newGroupWrapper.classList.add("education-entry");

  const newGroup = document.createElement("div");
  newGroup.classList.add("education-group"); // Same class for consistent spacing
  newGroup.innerHTML = `
    <label for="university">University <span class="required">*</span></label>
    <input type="text" id="university" placeholder="University" required />
    
    <label for="faculty">Faculty <span class="required">*</span></label>
    <input type="text" placeholder="Faculty" required />
    
    <label for="bachelor-degree">Degree <span class="required">*</span></label>
    <input type="text" id="bachelor-degree" placeholder="Bachelor Degree" required />
    
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

  // Scroll to the bottom to keep "Add Education" button visible
  educationForm.scrollTop = educationForm.scrollHeight;
});
