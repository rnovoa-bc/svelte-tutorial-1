import { connectToDatabase } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import { error, json, redirect } from '@sveltejs/kit';


export async function DELETE({ params }) {
  let result;
  if (params.id) {
    try {
      const db = await connectToDatabase();
      result = await db.collection('users').deleteOne({
        _id: new ObjectId(params.id)
      });
      
    }
    catch (err) {
      console.log('Failed to delete user: ', err);
      return error(500,  {message: 'Failed to delete user'})
    }
  } else {
    return error(406, { message: 'ID not provided'});
  }
  if (result.deletedCount === 1) {
    redirect(303, '/users');
  } else {
    return error(404, { message: 'User not deleted'});
  }
}