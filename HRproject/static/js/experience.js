const workForm = document.getElementById("workForm");
const workEntriesContainer = document.getElementById("work-entries-container");
const addWorkBtn = document.getElementById("addWork");

addWorkBtn.addEventListener("click", () => {
  const workWrapper = document.createElement("div");
  workWrapper.classList.add("work-entry");

  workWrapper.innerHTML = `
    <hr>
    <label>
      <b>Company Name</b><span style="color: red;"> *</span>
      <input type="text" name="company_name" placeholder="Enter company name" required />
    </label>

    <label>
      <b>Position Held</b><span style="color: red;"> *</span>
      <input type="text" name="position_held" placeholder="Enter position held" required />
    </label>

    <div class="date-fields">
      <div class="date-label">
        <label class="field-label">
          <span class="required">*</span> Start Date
        </label>
        <input type="month" name="start_date" required />
      

      </div>
      <div class="date-label">
        <label class="field-label">
          <span class="required">*</span> End Date
        </label>
        <input type="month" name="end_date" required />
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
