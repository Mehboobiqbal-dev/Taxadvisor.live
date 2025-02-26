import clientPromise from '@/app/lib/mongodb';
import { MongoClient, ServerApiVersion } from 'mongodb';

export const GET = async () => {
  try {
    // Use the pre-established client connection from your lib
    const client = await clientPromise;
    const db = client.db('cluster0');
    const collection = db.collection('test');
    const data = await collection.find({}).toArray();

    // Optional: Create a new MongoClient to perform a ping
    // Make sure to replace <db_password> with your actual database password
    const uri = "mongodb+srv://Mehboob090:Mehboob090%40@cluster0.zvqxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const pingClient = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    // Connect, ping, and close the pingClient
    await pingClient.connect();
    await pingClient.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    await pingClient.close();

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ success: false, message: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
