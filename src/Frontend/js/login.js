document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Anmeldung fehlgeschlagen');
            }

            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('user', JSON.stringify(data));

            // Weiterleitung zur Index-Seite nach erfolgreicher Anmeldung
            window.location.href = './index.html';

        } catch (error) {
            console.error('Fehler bei der Anmeldung:', error);
            messageDiv.textContent = 'Anmeldung fehlgeschlagen';
            messageDiv.style.color = 'red';
        }
    });
});
