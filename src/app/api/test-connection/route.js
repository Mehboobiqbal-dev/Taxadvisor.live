import clientPromise from '@/app/lib/mongodb';
import { MongoClient, ServerApiVersion } from 'mongodb';

export const GET = async () => {
  try {
   
    const client = await clientPromise;
    const db = client.db('cluster0');
    const collection = db.collection('test');
    const data = await collection.find({}).toArray();

   
    const uri =
      "";
    const pingClient = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    
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
