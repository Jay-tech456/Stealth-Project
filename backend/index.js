const express = require('express');
const mongoose = require('mongoose');

const app = express(); 
const PORT = 3001; 

// Establish connection to the MongoDB using mongoose NPM
const MONGO_URL = 'mongodb://localhost:27017/mydatabase'; 

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) => { 
    res.send("Hello world"); 
})

app.listen(PORT, () => { 
    console.log(`Listening on Port ${PORT}`)
});
