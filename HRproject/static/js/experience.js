const workGroup = document.querySelector(".work-group");
const addWorkBtn = document.getElementById("addWork");

addWorkBtn.addEventListener("click", () => {
  const workWrapper = document.createElement("div");
  workWrapper.classList.add("work-entry");

  workWrapper.innerHTML = `
    <hr />
    <label>
      Company Name<span style="color: red;"> *</span>
      <input type="text" placeholder="Enter company name" required />
    </label>
    <label>
      Position Held<span style="color: red;"> *</span>
      <input type="text" placeholder="Enter position held" required />
    </label>
    <div class="date-fields">
      <label>
        Start Date<span style="color: red;"> *</span>
        <input type="date" required />
      </label>
      <label>
        End Date<span style="color: red;"> *</span>
        <input type="date" required />
      </label>
    </div>
  `;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.type = "button";
  removeButton.classList.add("remove-btn");

  removeButton.addEventListener("click", () => {
    workGroup.removeChild(workWrapper);
  });

  workWrapper.appendChild(removeButton);
  workGroup.appendChild(workWrapper);
});
