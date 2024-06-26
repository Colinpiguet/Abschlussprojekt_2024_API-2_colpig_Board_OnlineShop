const router = require('express').Router();
const stripe = require('stripe')("sk_test_51PTidyRrIKA8aVF5FGGDHlNaPaYjyDIoiKgFAknBa6RolNz9UZRbGLVU9TG8lAgpYwwQLqUORTMMCtHPbO9g4un200rTfbcpXG"); // Stripe mit dem API-Schlüssel initialisieren
const Product = require("../models/products"); // Produktmodell importieren

router.post("/create-checkout-session", async (req, res) => {
    try {
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

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            billing_address_collection: "required",
            mode: "payment",
            line_items: line_items,
            success_url: `${process.env.CLIENT_URL}/sucess.html`,
            cancel_url: `${process.env.CLIENT_URL}/cart.html`,
        });

        res.json(session); // Session-ID zurückgeben
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
