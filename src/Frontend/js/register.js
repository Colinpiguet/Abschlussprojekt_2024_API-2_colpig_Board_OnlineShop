/**
 * Onlineshop
 *
 * Author: Colin Piguet
 *
 * Description:
 * This project is an online shop where you can add products to a cart, 
 * log in, or register. You can order these products with the integration 
 * of Stripe.
 *
 * Date: 28.06.2024
 *
 * Version: 1.0
 */

// Register Formular und Nachrichtenfeld holen
const registerForm = document.getElementById('registerForm');
const messageBox = document.getElementById('message');

// Eventlistener für das Absenden des Registrierungsformulars
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Standardverhalten des Formulars verhindern

  // Formulardaten holen
  const formData = new FormData(registerForm);
  const userData = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password')
  };

  try {
    // POST-Anfrage an die Registrierungs-API senden
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData) // Benutzerdaten als JSON senden
    });

    if (!response.ok) { // Prüfen, ob die Antwort erfolgreich ist
      throw new Error('Registration failed.'); // Fehler werfen, falls Registrierung fehlschlägt
    }

    const result = await response.json(); // Antwort als JSON parsen
    messageBox.textContent = 'Registration successful!'; // Erfolgsmeldung anzeigen

    // Weiterleitung zur Anmeldeseite nach erfolgreicher Registrierung
    window.location.href = 'login.html';

  } catch (error) {
    console.error('Registration error:', error); // Fehlermeldung ausgeben
    messageBox.textContent = 'Registration failed.'; // Fehlermeldung im Nachrichtenfeld anzeigen
  }
});
