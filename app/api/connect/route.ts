// app/api/connect/route.ts

import { MongoClient } from "mongodb";

const uri = "mongodb+srv://mongodb:Nilesh123@mydatabase.sgxomt2.mongodb.net/";
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    return new Response(JSON.stringify({ status: "Connected to MongoDB successfully!" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ status: "Failed to connect to MongoDB." }), { status: 500 });
  }
}
