document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm'); // Anmeldeformular holen
    const messageDiv = document.getElementById('message'); // Element für Nachrichten holen

    // Eventlistener für das Anmeldeformular
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Standardverhalten des Formulars verhindern

        const username = document.getElementById('username').value; // Benutzername lesen
        const password = document.getElementById('password').value; // Passwort lesen

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST', // POST-Anfrage
                headers: {
                    'Content-Type': 'application/json' // JSON-Daten
                },
                body: JSON.stringify({ username, password }) // Benutzerdaten senden
            });

            if (!response.ok) {
                throw new Error('Anmeldung fehlgeschlagen'); // Fehler bei Anmeldung
            }

            const data = await response.json(); // Antwort als JSON
            localStorage.setItem('accessToken', data.accessToken); // Token speichern
            localStorage.setItem('user', JSON.stringify(data)); // Benutzer speichern
            window.location.href = './index.html'; // Weiterleitung bei Erfolg

        } catch (error) {
            console.error('Fehler bei der Anmeldung:', error); // Fehlermeldung
            messageDiv.textContent = 'Anmeldung fehlgeschlagen'; // Anzeige Fehler
            messageDiv.style.color = 'red'; // Textfarbe rot
        }
    });
});
