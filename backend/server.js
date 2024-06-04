import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import loginRouter from './routes/login/login.js';
import cors from 'cors';
import restaurantRouter from './routes/resturant/resturant.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;  // Ensure this is 5000
// const port = 5002;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
// MongoDB connection URI
const uri = process.env.ATLAS_URI;

// Create a MongoDB client and connection pool
const client = new MongoClient(uri);
let db;

// Connect to MongoDB and start the server
async function startServer() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");
        db = client.db("PersonalProjects"); // Use the specified database
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
}

// Use the login router for all routes starting with '/login'
app.use('/api', loginRouter);
// if you neeed to add more routes, you can add them here
// by creating new routes as in backend/routes/login/login.js as an example
app.use('/api', restaurantRouter);
// Start the server
startServer();



// import express from 'express';
// import dotenv from 'dotenv';
// import { MongoClient } from 'mongodb';
// import loginRouter from './routes/login/login.js';

// dotenv.config();
// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware to parse JSON
// app.use(express.json());

// // MongoDB connection URI
// const uri = process.env.ATLAS_URI;

// // Create a MongoDB client and connection pool
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// let db;

// // Connect to MongoDB and start the server
// async function startServer() {
//     try {
//         await client.connect();
//         console.log("Connected to MongoDB");
//         db = client.db("PersonalProjects"); // Use the specified database
//         app.listen(port, () => {
//             console.log(`Server running on port ${port}`);
//         });
//     } catch (err) {
//         console.error("Failed to connect to MongoDB", err);
//         process.exit(1);
//     }
// }

// // Use the login router for all routes starting with '/login'
// app.use('/api', loginRouter);

// // Start the server
// startServer();
