// ===== LANGUAGE SECTION =====
const languageGroup = document.querySelector(".language-group");
const addLanguageBtn = document.getElementById("addLanguage");

addLanguageBtn.addEventListener("click", () => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("language-entry");

  const languageSelect = document.createElement("select");
  languageSelect.required = true;
  languageSelect.name = "language[]";
  languageSelect.innerHTML = `
    <option value="">Select Language</option>
    <option value="Armenian">Armenian</option>
    <option value="English">English</option>
    <option value="French">French</option>
    <option value="German">German</option>
    <option value="Spanish">Spanish</option>
    <option value="Russian">Russian</option>
    <option value="Other">Other</option>
  `;

  const scoreInput = document.createElement("input");
  scoreInput.type = "text";
  scoreInput.placeholder = "Score / Level (e.g. B2, 90%)";
  scoreInput.required = true;
  scoreInput.name = "language_score[]";

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.type = "button";
  removeBtn.style.background = "#f44336";
  removeBtn.style.color = "white";
  removeBtn.style.border = "none";
  removeBtn.style.borderRadius = "5px";
  removeBtn.style.padding = "0.4rem 0.6rem";

  removeBtn.addEventListener("click", () => {
    languageGroup.removeChild(wrapper);
  });

  wrapper.appendChild(languageSelect);
  wrapper.appendChild(scoreInput);
  wrapper.appendChild(removeBtn);

  languageGroup.appendChild(wrapper);
});

// ===== CUSTOM SKILLS SECTION =====
const customSkillName = document.getElementById("customSkillName");
const customSkillScore = document.getElementById("customSkillScore");
const addCustomSkillBtn = document.getElementById("addCustomSkill");
const customSkillsList = document.getElementById("customSkillsList");

addCustomSkillBtn.addEventListener("click", () => {
  const name = customSkillName.value.trim();
  const score = customSkillScore.value.trim();

  if (name === "" || score === "") return;

  const skillItem = document.createElement("div");
  skillItem.classList.add("custom-skill-item");

  const nameSpan = document.createElement("span");
  nameSpan.textContent = name;

  const scoreSpan = document.createElement("span");
  scoreSpan.classList.add("custom-skill-score");
  scoreSpan.textContent = `(${score})`;

  const hiddenName = document.createElement("input");
  hiddenName.type = "hidden";
  hiddenName.name = "skill_name[]";
  hiddenName.value = name;

  const hiddenScore = document.createElement("input");
  hiddenScore.type = "hidden";
  hiddenScore.name = "skill_score[]";
  hiddenScore.value = score;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "×";
  removeBtn.style.background = "#f44336";
  removeBtn.style.color = "white";
  removeBtn.style.border = "none";
  removeBtn.style.borderRadius = "50%";
  removeBtn.style.width = "20px";
  removeBtn.style.height = "20px";
  removeBtn.style.cursor = "pointer";

  removeBtn.addEventListener("click", () => {
    customSkillsList.removeChild(skillItem);
  });

  skillItem.appendChild(nameSpan);
  skillItem.appendChild(scoreSpan);
  skillItem.appendChild(removeBtn);
  skillItem.appendChild(hiddenName);
  skillItem.appendChild(hiddenScore);

  customSkillsList.appendChild(skillItem);

  customSkillName.value = "";
  customSkillScore.value = "";
});
