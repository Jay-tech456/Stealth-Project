import express from 'express';
import db from '../../db/conn.mjs';

const restaurantRouter = express.Router();

// Middleware to ensure the database is connected before handling requests
restaurantRouter.use((req, res, next) => {
    if (!db) {
        return res.status(503).send({ error: "Database connection not established" });
    }
    next();
});

// GET method --- For Restaurants will give you all of the Restaurant details
restaurantRouter.get('/restaurants', async (req, res) => {
    try {
        const collection = db.collection("Restaurant");
        const results = await collection.find({}).limit(50).toArray();
        res.send(results);
    } catch (error) {
        console.error("An error occurred while fetching data:", error);
        res.status(500).send({ error: "An error occurred while fetching data." });
    }
});


// GET method --- For Reviews will give you all of the Review details or a specific review by integer key
restaurantRouter.get('/review', async (req, res) => {
    try {

        // In case the user wants to view a specified resturant's review, they would detect it using the key
        const { key } = req.query;
    

        const collection = db.collection("Review");
        let results;
        

        // If there is a querry key, the Rest will filter out everything else that do not have it. 
        if (key) {
            const intKey = parseInt(key, 10);
            results = await collection.find({ key: intKey }).toArray();
        } else {
            results = await collection.find({}).limit(50).toArray();
        }

        res.send(results);
    } catch (error) {
        console.error("An error occurred while fetching data:", error);
        res.statussend({ error: "An error occurred while fetching data." });
    }
});

restaurantRouter.post('/review', async (req, res) => {
    try {
        const { key, restaurant_name, description, star, time_date, first_name } = req.body;
            // console.log(req.body);

            // the body for the new review
        const newReview = {
            "key":key,
            "restaurant_name": restaurant_name,
            "description":description,
            "star":star,
            time_date: new Date(time_date),
            "first_name": first_name
        };
        console.log(newReview)
        const collection = db.collection("Review");
        const result = await collection.insertOne(newReview);

        res.status(201).send({ message: "Review added successfully", review: newReview });
    } catch (error) {
        console.error("An error occurred while adding the review:", error);
        res.status(500).send({ error: "An error occurred while adding the review." });
    }
});

export default restaurantRouter;
