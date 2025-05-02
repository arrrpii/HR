let selectedDepartment = null;

document.addEventListener('DOMContentLoaded', () => {
  const options = document.querySelectorAll('.option');
  const continueBtn = document.querySelector('.continue-btn');
  const departmentInput = document.getElementById('selectedDepartmentInput');

  options.forEach(option => {
    option.addEventListener('click', () => {
      
      options.forEach(opt => {
        opt.classList.remove('active');
        opt.querySelector('.radio').classList.remove('selected');
      });

      
      option.classList.add('active');
      option.querySelector('.radio').classList.add('selected');

      
      selectedDepartment = option.getAttribute('data-value');
      departmentInput.value = selectedDepartment;
    });
  });

  continueBtn.addEventListener('click', (e) => {
    if (!selectedDepartment) {
      e.preventDefault();
      alert('Please select a department before continuing.');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const options = document.querySelectorAll('.option');
  const departmentInput = document.getElementById('selectedDepartmentInput');

  options.forEach(option => {
    option.addEventListener('click', () => {
      options.forEach(opt => {
        opt.classList.remove('active');
        opt.querySelector('.radio').classList.remove('selected');
      });

      option.classList.add('active');
      option.querySelector('.radio').classList.add('selected');
      departmentInput.value = option.getAttribute('data-value');
    });
  });
});
