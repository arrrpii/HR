const educationForm = document.getElementById("educationForm");
const educationGroup = document.querySelector(".education-group");
const addButton = document.getElementById("addEducation");

addButton.addEventListener("click", () => {
  const newGroupWrapper = document.createElement("div");
  newGroupWrapper.classList.add("education-entry");

  const newGroup = document.createElement("div");
  newGroup.classList.add("education-group"); // Same class for consistent spacing
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
    newGroupWrapper.remove(); // Corrected: remove from DOM directly
  });

  newGroupWrapper.appendChild(document.createElement("hr"));
  newGroupWrapper.appendChild(newGroup);
  newGroupWrapper.appendChild(removeButton);

  // Append to the parent that contains all entries (add below the initial one)
  educationGroup.parentElement.appendChild(newGroupWrapper);

  // Scroll to the bottom to keep "Add Education" button visible
  educationForm.scrollTop = educationForm.scrollHeight;
});
