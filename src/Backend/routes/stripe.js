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

const router = require('express').Router();
const stripe = require('stripe')("sk_test_51PTidyRrIKA8aVF5FGGDHlNaPaYjyDIoiKgFAknBa6RolNz9UZRbGLVU9TG8lAgpYwwQLqUORTMMCtHPbO9g4un200rTfbcpXG"); // Stripe mit dem API-Schlüssel initialisieren
const Product = require("../models/products"); // Produktmodell importieren

// Route zum Erstellen einer Stripe-Checkout-Session
router.post("/create-checkout-session", async (req, res) => {
    try {
        // Erstellung der line_items für die Checkout-Session basierend auf den Produkten im Warenkorb
        const line_items = await Promise.all(req.body.items.map(async item => {
            const storeItem = await Product.findById(item.id); // Produkt aus der Datenbank abrufen
            return {
                price_data: {
                    currency: "chf",
                    product_data: {
                        name: storeItem.name,
                    },
                    unit_amount: storeItem.price,
                },
                quantity: item.quantity,
            };
        }));

        // Erstellen der Stripe-Checkout-Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            billing_address_collection: "required",
            mode: "payment",
            line_items: line_items,
            success_url: `${process.env.CLIENT_URL}/success.html`, // Erfolgsseite
            cancel_url: `${process.env.CLIENT_URL}/cart.html`, // Abbruchseite
        });

        res.json(session); // Rückgabe der Session-Daten an den Client
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message }); // Fehlerbehandlung
    }
});

module.exports = router; // Export des Routers
