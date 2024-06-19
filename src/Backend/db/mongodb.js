const { MongoClient } = require('mongodb');

const url = `mongodb://localhost:27017`;
let client;

async function getDB() {
    if (!client) {
        client = new MongoClient(url);
        await client.connect();
    }
    return client.db('online_shop');
}

module.exports = getDB;