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

const mongoose = require("mongoose");

// Definition des User-Schemas
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true }, // Benutzername muss eindeutig und vorhanden sein
    email: { type: String, required: true, unique: true },    // E-Mail muss eindeutig und vorhanden sein
    password: { type: String, required: true },               // Passwort muss vorhanden sein
    isAdmin: { type: Boolean, default: false },               // Standardmässig ist der Benutzer kein Admin
  },
  { timestamps: true } // Automatische Erstellung von createdAt und updatedAt Feldern
);

// Exportieren des User-Modells
module.exports = mongoose.model("User", UserSchema);
