// app/api/signup/route.ts

import { MongoClient } from "mongodb";

const uri = "mongodb+srv://mongodb:Nilesh123@mydatabase.sgxomt2.mongodb.net/";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    const database = client.db("Vercel");

    // Check if "projects" collection exists
    const collections = await database.listCollections({ name: "flask" }).toArray();
    if (collections.length === 0) {
      // Create the collection if it doesn't exist
      await database.createCollection("flask");
    }

    return database.collection("flask");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}

export async function POST(req: Request) {
  const { name, password } = await req.json();

  try {
    const collection = await connectToDatabase();

    // Store user details in the "projects" collection
    const result = await collection.insertOne({ name, password });

    return new Response(JSON.stringify({ status: "User details stored successfully!", id: result.insertedId }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ status: "Failed to store user details." }), { status: 500 });
  }
}
