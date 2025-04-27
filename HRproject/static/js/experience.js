const workForm = document.getElementById("workForm");
const workEntriesContainer = document.getElementById("work-entries-container");
const addWorkBtn = document.getElementById("addWork");

// When the user clicks the "Add Work Experience" button:
addWorkBtn.addEventListener("click", () => {
  const workWrapper = document.createElement("div");
  workWrapper.classList.add("work-entry");

  // Create a new work entry group
  workWrapper.innerHTML = `
    <hr />
    <label>
      Company Name<span style="color: red;"> *</span>
      <input type="text" name="company_name" placeholder="Enter company name" required />
    </label>
    <label>
      Position Held<span style="color: red;"> *</span>
      <input type="text" name="position_held" placeholder="Enter position held" required />
    </label>
    <div class="date-fields">
      <div class="date-label">
        <label>
          Start Date<span style="color: red;"> *</span>
          <input type="date" name="start_date" required />
        </label>
      </div>
      <div class="date-label">
        <label>
          End Date<span style="color: red;"> *</span>
          <input type="date" name="end_date" required />
        </label>
      </div>
    </div>
  `;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.type = "button";
  removeButton.classList.add("remove-btn");

  removeButton.addEventListener("click", () => {
    workWrapper.remove();
  });

  workWrapper.appendChild(removeButton);
  workEntriesContainer.appendChild(workWrapper);
});
