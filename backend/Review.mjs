import "./loadEnvironment.mjs"; 
import express from 'express';
import db from "./db/conn.mjs";

const app = express();
const port = process.env.PORT2 || 5051;


// Middleware to parse JSON
app.use(express.json());


// Ensure the database is connected before handling requests
app.use((req, res, next) => {
    if (!db) {
      return res.status(503).send({ error: "Database connection not established" });
    }
    next();
  });


// GET method --- Security Purposes, will give you all of the Reviews
app.get('/Review', async (req, res) => {
    try {
        let collection = db.collection("Restaurant");
        let results = await collection.find({}).limit(50).toArray();
        res.send(results);
    } catch (error) {
        res.send({ error: "An error occurred while fetching data." });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
