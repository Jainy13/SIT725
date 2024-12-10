const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://jainy:jainy@cluster0.hub14.mongodb.net/?";

async function insertData() {
    const client = new MongoClient(uri);
    try {
        console.log("Connecting to MongoDB...");
        await client.connect();
        console.log("Connected!");

        const db = client.db("myDB");
        const collection = db.collection("pizzaMenu");

        const pizzas = [
            { name: "Margherita", ingredients: ["tomato", "mozzarella", "basil"], price: 8.99 },
            { name: "Pepperoni", ingredients: ["tomato", "mozzarella", "pepperoni"], price: 9.99 },
            { name: "Veggie Supreme", ingredients: ["tomato", "bell peppers", "onion", "olives"], price: 10.49 }
        ];

        console.log("Inserting data...");
        const result = await collection.insertMany(pizzas);
        console.log("Inserted data:", result.insertedIds);
    } catch (err) {
        console.error("Error inserting data:", err);
    } finally {
        await client.close();
        console.log("Connection closed.");
    }
}

async function fetchAllData() {
    const client = new MongoClient(uri);
    try {
        console.log("Connecting to MongoDB...");
        await client.connect();
        console.log("Connected!");

        const db = client.db("myDB");
        const collection = db.collection("pizzaMenu");

        console.log("Fetching data...");
        const data = await collection.find().toArray();
        console.log("Fetched data:", data);
    } catch (err) {
        console.error("Error fetching data:", err);
    } finally {
        await client.close();
        console.log("Connection closed.");
    }
}

async function main() {
    await insertData();
    await fetchAllData();
}

main();
