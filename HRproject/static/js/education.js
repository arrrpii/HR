const educationForm = document.getElementById("educationForm");
const addButton = document.getElementById("addEducation");
const newFieldsContainer = document.getElementById("new-fields-container");

addButton.addEventListener("click", () => {
  const newGroupWrapper = document.createElement("div");
  newGroupWrapper.classList.add("education-entry");

  const newGroup = document.createElement("div");
  newGroup.classList.add("education-group");
  newGroup.innerHTML = `
    <label>University <span class="required">*</span></label>
    <input type="text" name="university[]" placeholder="University" required />
    
    <label>Faculty <span class="required">*</span></label>
    <input type="text" name="faculty[]" placeholder="Faculty" required />
    
    <label>Degree <span class="required">*</span></label>
    <input type="text" name="degree[]" placeholder="Bachelor Degree" required />
  `;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.type = "button";
  removeButton.classList.add("remove-btn");

  removeButton.addEventListener("click", () => {
    newGroupWrapper.remove();
  });

  newGroupWrapper.appendChild(document.createElement("hr"));
  newGroupWrapper.appendChild(newGroup);
  newGroupWrapper.appendChild(removeButton);

  // Append inside the correct container
  newFieldsContainer.appendChild(newGroupWrapper);

  // Optional: scroll to bottom
  educationForm.scrollTop = educationForm.scrollHeight;
});
