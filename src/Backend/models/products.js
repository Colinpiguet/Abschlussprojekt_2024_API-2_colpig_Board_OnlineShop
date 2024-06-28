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

// Definition des Produkt-Schemas
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },       // Produktname muss eindeutig und vorhanden sein
    image: { type: String, required: true },                   // Bild-URL des Produkts muss vorhanden sein
    price: { type: String, required: true },                   // Preis des Produkts muss vorhanden sein
    description: { type: String, required: true },             // Beschreibung des Produkts muss vorhanden sein
    category: { type: String, required: true },                // Kategorie des Produkts muss vorhanden sein
  },
  { timestamps: true } // Automatische Erstellung von createdAt und updatedAt Feldern
);

// Exportieren des Produkt-Modells
module.exports = mongoose.model("Product", ProductSchema);
