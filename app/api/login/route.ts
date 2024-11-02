// app/api/login/route.ts

import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// MongoDB connection URI and Database details
const uri = "mongodb+srv://mongodb:Nilesh123@mydatabase.sgxomt2.mongodb.net/"
//process.env.MONGODB_URI || "your_mongodb_uri_here";
const dbName = "Vercel";
const collectionName = "flask";

let client: MongoClient | null = null;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db(dbName).collection(collectionName);
}

export async function POST(request: Request) {
  const { name, password } = await request.json();

  try {
    const collection = await connectToDatabase();
    
    // Find user by name and password
    const user = await collection.findOne({ name, password });

    if (user) {
      return NextResponse.json({ message: "Login successful!" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid name or password." }, { status: 401 });
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return NextResponse.json({ error: "An error occurred during login." }, { status: 500 });
  }
}
