const express = require('express');
const getDB = require('./db/mongodb');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/products', async (req, res) => {
    const db = await getDB();
    const collection = db.collection('products');
    const daten = await collection.find().toArray();
    res.json(daten);
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
