import "./loadEnvironment.mjs"; 
import express from 'express';
import db from "./db/conn.mjs";

const app = express();
const port = process.env.PORT;

// Middleware to parse JSON
app.use(express.json());

// Ensure the database is connected before handling requests
app.use((req, res, next) => {
  if (!db) {
    return res.status(503).send({ error: "Database connection not established" });
  }
  next();
});

// GET method --- Security Purposes, will give you all of the credentials
app.get('/Login', async (req, res) => {
    try {
        let collection = db.collection("Login");
        let results = await collection.find({}).limit(50).toArray();
        res.send(results);
    } catch (error) {
        res.send({ error: "An error occurred while fetching data." });
    }
});


app.post('/Login', async (req, res) => {
  try {
    console.log("Post request has been recieved")


      /* ******************************************
        SAMPLE INPUT 
        { 
          email: "happyTommatores@21"
          password: "ThereWillNeverBeAnotherYou"
        }
      ***********************************************/ 

      let { email, password } = req.body;

      let collection = db.collection("Login");
      

      // if the collection returns null, then user does not exist
      let user = await collection.findOne({ Email: email });
      if (!user) {
          return res.send({ message: "Invalid email or password" });
      }

      if (password !== user.Password) {
          return res.send({ message: "Invalid email or password" });
      }

      res.send({ message: "Login successful" });
  } 
  catch (error) {
      res.send({ error: "An error occurred while validating credentials." });
  }
});



app.put('/Login', async (req, res) => {
  try {

    /* 
      Sample Body that will be sent: 
        {
          "fName": "Author",
          "lName": "Smith",
          "email": "dell@gmail.com",
          "password": "happylane"
      }
    */ 
      let { fName, lName, email, password } = req.body;
      let collection = db.collection("Login");

      // Check if the email already exists  -- if email already exist, then we cannot 
      // make duplicate accounts

      // Side Note: Use Case 1 passes -- Duplicate account
      let user = await collection.findOne({ Email: email });
      if (user) {
          return res.send({ message: "Email already exists" });
      }
      let newUser = { "First Name": fName, "Last Name": lName, Email: email, Password: password };
      // console.log(newUser); 

      // Use Case #2 for put request, Account successfully created, and will show on Atlas
      await collection.insertOne(newUser);

      res.send({ message: "User created successfully" });
  } catch (error) {
      res.send({ error: "An error occurred while creating the user." });
  }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
