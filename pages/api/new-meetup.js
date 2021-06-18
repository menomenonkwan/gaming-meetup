import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    
    const mongoDb = process.env.DB_CONNECTION_STRING;
    const client = await MongoClient.connect(mongoDb, { useNewUrlParser: true , useUnifiedTopology: true});
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    client.close();
 
    res.status(201).json({message: 'Meetup Added!'});
  }
}