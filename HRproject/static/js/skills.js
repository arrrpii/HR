// ===== LANGUAGE SECTION =====
const languageGroup = document.querySelector(".language-group");
const addLanguageBtn = document.getElementById("addLanguage");

addLanguageBtn.addEventListener("click", () => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("language-entry");

  const langInput = document.createElement("input");
  langInput.type = "text";
  langInput.placeholder = "Language";
  langInput.required = true;

  const levelSelect = document.createElement("select");
  levelSelect.required = true;
  levelSelect.innerHTML = `
    <option value="">Select Level</option>
    <option value="Beginner">Beginner</option>
    <option value="Intermediate">Intermediate</option>
    <option value="Advanced">Advanced</option>
    <option value="Fluent">Fluent</option>
    <option value="Native">Native</option>
  `;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.type = "button";
  removeBtn.classList.add("remove-btn");
  removeBtn.style.background = "#f44336";
  removeBtn.style.color = "white";
  removeBtn.style.marginLeft = "1rem";

  removeBtn.addEventListener("click", () => {
    languageGroup.removeChild(wrapper);
  });

  wrapper.appendChild(langInput);
  wrapper.appendChild(levelSelect);
  wrapper.appendChild(removeBtn);

  languageGroup.appendChild(wrapper);
});

// ===== CUSTOM SKILLS SECTION =====
const customSkillInput = document.getElementById("customSkillInput");
const addCustomSkillBtn = document.getElementById("addCustomSkill");
const customSkillsList = document.getElementById("customSkillsList");

addCustomSkillBtn.addEventListener("click", () => {
  const skill = customSkillInput.value.trim();
  if (skill === "") return;

  const skillItem = document.createElement("div");
  skillItem.classList.add("custom-skill-item");

  const hiddenInput = document.createElement("input");
  hiddenInput.type = "hidden";
  hiddenInput.name = "customSkills[]";
  hiddenInput.value = skill;

  const label = document.createElement("span");
  label.textContent = skill;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "×";
  removeBtn.addEventListener("click", () => {
    customSkillsList.removeChild(skillItem);
  });

  skillItem.appendChild(label);
  skillItem.appendChild(removeBtn);
  skillItem.appendChild(hiddenInput);

  customSkillsList.appendChild(skillItem);
  customSkillInput.value = "";
});
