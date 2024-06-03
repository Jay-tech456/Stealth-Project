import express from 'express';
import db from '../../db/conn.mjs';
const loginRouter = express.Router();

// Endpoint to get all Users
loginRouter.get('/users', async (req, res) => {
    try {
        const collection = db.collection("Login");
        const results = await collection.find({}).toArray();
        res.send(results);
    } catch (error) {
        console.error("An error occurred while fetching data:", error);
        res.status(500).send({ error: "An error occurred while fetching data." });
    }
});

// Endpoint for user login
loginRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const collection = db.collection("Login");
        const user = await collection.findOne({ Email: email, Password: password });
        if (!user) {
            return res.status(401).send({ error: "Invalid email or password." });
        }
        delete user.Password;

        res.send({ message: "ok", user });
    } catch (error) {
        console.error("An error occurred during login:", error);
        res.status(500).send({ error: "An error occurred during login." });
    }
});

// Endpoint for user sign-up
loginRouter.post('/signup', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const collection = db.collection("Login");
        // Check if the email is already in use
        const existingUser = await collection.findOne({ Email: email });
        if (existingUser) {
            return res.status(400).send({ error: "Email already in use." });
        }

        // Insert the new user into the database
        const newUser = {
            Email: email,
            Password: password,
            "First Name": firstName,
            "Last Name": lastName
        };
        await collection.insertOne(newUser);

        res.status(201).send({ message: "User signed up successfully.", user: newUser });
    } catch (error) {
        console.error("An error occurred during sign-up:", error);
        res.status(500).send({ error: "An error occurred during sign-up." });
    }
});




export default loginRouter;