document.querySelector('.forgot-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = e.target.querySelector('input[type="email"]').value;

    if (email) {
        alert(`A password reset link has been sent to ${email}.`); 
    } else {
        alert('Please enter your email address.');
    }
});
