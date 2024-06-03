import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    db = client.db("PersonalProjects"); 
  } catch (e) {
    console.error("Error connecting to MongoDB Atlas:", e);
  }
}

await connectToDatabase();

export default db;
