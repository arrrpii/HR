const workGroup = document.querySelector(".work-group");
const addWorkBtn = document.getElementById("addWork");

addWorkBtn.addEventListener("click", () => {
  const workWrapper = document.createElement("div");
  workWrapper.classList.add("work-entry");

  workWrapper.innerHTML = `
    <hr />
    <input type="text" placeholder="Company Name" required />
    <input type="text" placeholder="Position Held" required />
    <div class="date-fields">
      <label>
        Start Date:
        <input type="date" required />
      </label>
      <label>
        End Date:
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
