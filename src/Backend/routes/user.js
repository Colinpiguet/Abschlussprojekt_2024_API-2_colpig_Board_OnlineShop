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

const User = require("../models/user");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// UPDATE Benutzerinformationen
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  // Wenn ein Passwort im Request-Body enthalten ist, wird es verschlüsselt
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    // Aktualisierung des Benutzers in der Datenbank
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE Benutzer
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Benutzerinformationen
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // Ausschliessen des Passworts aus der Antwort
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET alle Benutzer
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    // Abrufen der neuesten Benutzer, wenn der 'new'-Query-Parameter gesetzt ist
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
