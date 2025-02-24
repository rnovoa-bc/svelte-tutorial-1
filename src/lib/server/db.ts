import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let db: Db;

export async function connectToDatabase() {
    
    if (!db) {
        await client.connect();
        db = client.db('users');
    }
    return db;
}