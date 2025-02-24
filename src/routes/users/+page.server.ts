import { connectToDatabase } from '$lib/server/db';
import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type { User } from '$lib/interfaces';

export async function load(event: ServerLoadEvent) {
  try {
    const db = await connectToDatabase();
    const users = await db.collection<User>('users').find().toArray();

    return { users: users.map(user => ({
      ...user, _id: user._id.toString()
    })) };
  } catch (err) {
    console.log("Failed to get users: ", err);
    throw error(500, 'Failed to get users');
  }
  
}

