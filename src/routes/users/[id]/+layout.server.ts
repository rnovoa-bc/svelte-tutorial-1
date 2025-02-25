import { connectToDatabase } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import { fail, type ServerLoadEvent } from '@sveltejs/kit';
import type { User } from '$lib/interfaces';

export async function load(event: ServerLoadEvent) {
    const { id } = event.params;

    try {
        const db = await connectToDatabase();
        const user = await db.collection('users').findOne<User>(
            { _id: new ObjectId(id) });
        
        if (!user) {
            return fail(404, { message: 'User not found' });
        }
        
        return { ...user, _id: user._id?.toString() };
    } catch (err) {
        console.error('Failed to load user:', err);
        return fail(500, { message: 'Failed to load user' });
    }
}