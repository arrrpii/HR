let selectedDepartment = null;

document.addEventListener('DOMContentLoaded', () => {
  const options = document.querySelectorAll('.option');
  const continueBtn = document.getElementById('continueBtn');

  options.forEach(option => {
    option.addEventListener('click', () => {
      // Deselect all
      options.forEach(opt => {
        opt.classList.remove('active');
        opt.querySelector('.radio').classList.remove('selected');
      });

      // Select clicked
      option.classList.add('active');
      option.querySelector('.radio').classList.add('selected');
      selectedDepartment = option.getAttribute('data-value');
    });
  });

  continueBtn.addEventListener('click', () => {
    if (!selectedDepartment) {
      alert('Please select a department before continuing.');
      return;
    }

    // Redirect or send data as needed
    window.location.href = `/next-step?department=${selectedDepartment}`;
  });
});
