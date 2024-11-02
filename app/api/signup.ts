// app/api/signup.ts

import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb"; // Adjust path as necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, password } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db("your_database_name"); // Replace with your database name
      const collection = db.collection("users"); // Replace with your collection name
      
      // Insert user data into MongoDB
      await collection.insertOne({ name, password });

      res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Failed to connect to MongoDB: " + error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
