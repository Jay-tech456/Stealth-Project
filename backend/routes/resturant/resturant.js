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


// GET method --- For Reviews will give you all of the Review details or a specific review by restaurant name
restaurantRouter.get('/review', async (req, res) => {
    try {
        // In case the user wants to view a specified restaurant's review, they would detect it using the restaurant_name
        const { restaurant_name } = req.query;

        const collection = db.collection("Review");
        let results;

        // If there is a query restaurant_name, filter out everything else that does not have it
        if (restaurant_name) {
            results = await collection.find({ restaurant_name }).toArray();
        } else {
            results = await collection.find({}).limit(50).toArray();
        }

        res.send(results);
    } catch (error) {
        console.error("An error occurred while fetching data:", error);
        res.status(500).send({ error: "An error occurred while fetching data." });
    }
});

restaurantRouter.post('/review', async (req, res) => {
    try {
        const { key, restaurant_name, description, star, time_date, first_name } = req.body;

        // The body for the new review
        const newReview = {
            key,
            restaurant_name,
            description,
            star,
            time_date: new Date(time_date),
            first_name,
        };

        const reviewCollection = db.collection('Review');
        const restaurantCollection = db.collection('Restaurant');

        // Insert the new review into the Review collection
        await reviewCollection.insertOne(newReview);

        // Fetch the restaurant document to get current numOfReviews and rating
        const restaurant = await restaurantCollection.findOne({ name: restaurant_name });

        if (!restaurant) {
            return res.status(404).send({ error: 'Restaurant not found.' });
        }

        // Calculate the new average rating
        const newNumOfReviews = restaurant.numOfReviews + 1;
        const newAverageRating = (((restaurant.rating * restaurant.numOfReviews) + star) / newNumOfReviews).toFixed(2);
        // Increment the numOfReviews field and update the average rating in the restaurant collection
        await restaurantCollection.updateOne(
            { name: restaurant_name },
            { 
                $inc: { numOfReviews: 1 },
                $set: { rating: newAverageRating }
            }
        );

        res.status(201).send({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        console.error('An error occurred while adding the review:', error);
        res.status(500).send({ error: 'An error occurred while adding the review.' });
    }
});

// restaurantRouter.post('/review', async (req, res) => {
//     try {
//         const { key, restaurant_name, description, star, time_date, first_name } = req.body;
//             // console.log(req.body);

//             // the body for the new review
//         const newReview = {
//             "key":key,
//             "restaurant_name": restaurant_name,
//             "description":description,
//             "star":star,
//             time_date: new Date(time_date),
//             "first_name": first_name
//         };
//         console.log(newReview)
//         const collection = db.collection("Review");
//         const result = await collection.insertOne(newReview);

//         res.status(201).send({ message: "Review added successfully", review: newReview });
//     } catch (error) {
//         console.error("An error occurred while adding the review:", error);
//         res.status(500).send({ error: "An error occurred while adding the review." });
//     }
// });

export default restaurantRouter;
