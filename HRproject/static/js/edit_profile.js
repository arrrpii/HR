document.addEventListener('DOMContentLoaded', function () {
  
  let eduIndex = document.querySelectorAll('.education-block').length + 1;

  const addEducationBtn = document.getElementById('add-education-btn');
  const educationSection = document.getElementById('education-section');
  const educationTemplate = document.getElementById('education-template').innerHTML;

  addEducationBtn.addEventListener('click', function () {
    const newBlock = educationTemplate
      .replace(/education_level_INDEX/g, 'education_level_' + eduIndex)
      .replace(/education_university_INDEX/g, 'education_university_' + eduIndex)
      .replace(/education_faculty_INDEX/g, 'education_faculty_' + eduIndex);

    educationSection.insertAdjacentHTML('beforeend', newBlock);
    eduIndex++;
  });

  
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-education')) {
      event.target.closest('.education-block').remove();
    }
  });

  
  let expIndex = document.querySelectorAll('.experience-block').length + 1;

  const addExperienceBtn = document.getElementById('add-experience-btn');
  const experienceSection = document.getElementById('experience-section');
  const experienceTemplate = document.getElementById('experience-template').innerHTML;

  addExperienceBtn.addEventListener('click', function () {
    const newBlock = experienceTemplate
      .replace(/exp_company_INDEX/g, 'exp_company_' + expIndex)
      .replace(/exp_position_INDEX/g, 'exp_position_' + expIndex)
      .replace(/exp_start_INDEX/g, 'exp_start_' + expIndex)
      .replace(/exp_end_INDEX/g, 'exp_end_' + expIndex);

    experienceSection.insertAdjacentHTML('beforeend', newBlock);
    expIndex++;
  });

  
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-experience')) {
      event.target.closest('.experience-block').remove();
    }
  });

  
  let skillIndex = document.querySelectorAll('.skills-block').length + 1;

  const addSkillBtn = document.getElementById('add-skill-btn');
  const skillsSection = document.getElementById('skills-section');
  const skillsTemplate = document.getElementById('skills-template').innerHTML;

  addSkillBtn.addEventListener('click', function () {
    const newBlock = skillsTemplate
      .replace(/skill_name_INDEX/g, 'skill_name_' + skillIndex)
      .replace(/skill_score_INDEX/g, 'skill_score_' + skillIndex);

    skillsSection.insertAdjacentHTML('beforeend', newBlock);
    skillIndex++;
  });

  
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-skill')) {
      event.target.closest('.skills-block').remove();
    }
  });

  
  let langIndex = document.querySelectorAll('.language-block').length + 1;

  const addLanguageBtn = document.getElementById('add-language-btn');
  const languageSection = document.getElementById('language-section');
  const languageTemplate = document.getElementById('language-template').innerHTML;

  addLanguageBtn.addEventListener('click', function () {
    const newBlock = languageTemplate
      .replace(/lang_name_INDEX/g, 'lang_name_' + langIndex)
      .replace(/lang_score_INDEX/g, 'lang_score_' + langIndex);

    languageSection.insertAdjacentHTML('beforeend', newBlock);
    langIndex++;
  });

  
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-language')) {
      event.target.closest('.language-block').remove();
    }
  });
});
