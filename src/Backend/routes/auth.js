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

const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER Benutzer
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(), // Passwort verschlüsseln
  });

  try {
    const savedUser = await newUser.save(); // Benutzer speichern
    res.status(201).json(savedUser); // Erfolgsantwort senden
  } catch (err) {
    res.status(500).json(err); // Fehlerantwort senden
  }
});

// LOGIN Benutzer
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }); // Benutzer suchen

    if (!user) {
      return res.status(401).json({ error: "Wrong Username or Password" }); // Fehler bei falschem Benutzernamen
    }

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json({ error: "Wrong Username or Password" }); // Fehler bei falschem Passwort
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin }, // Token mit Benutzerinformationen erstellen
      process.env.JWT_SEC,
      { expiresIn: "30d" } // Token Ablaufzeit
    );

    const { password, ...userWithoutPassword } = user._doc; // Passwort aus der Antwort entfernen
    res.status(200).json({ ...userWithoutPassword, accessToken }); // Erfolgsantwort senden
  } catch (err) {
    console.error("Error during login:", err); // Fehler im Serverprotokoll
    res.status(500).json({ error: "Server error" }); // Fehlerantwort senden
  }
});

module.exports = router; // Router exportieren
