const registerForm = document.getElementById('registerForm');
const messageBox = document.getElementById('message');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(registerForm);
  const userData = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password')
  };

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('Registration failed.');
    }

    const result = await response.json();
    messageBox.textContent = 'Registration successful!';

    //Redirect to login page after successful registration
    window.location.href = 'login.html';

  } catch (error) {
    console.error('Registration error:', error);
    messageBox.textContent = 'Registration failed.';
  }
});
