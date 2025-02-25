import { connectToDatabase } from "$lib/server/db";
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { ObjectId } from "mongodb";

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    /**
     * * Here add some extra validation if needed
     * TODO encrypt the password
     */
    let result;
    try {

      const db = await connectToDatabase();
      result = await db.collection('users').updateOne({_id: new ObjectId(formData.get('_id') as string)},
        {
          $set:  { name: formData.get('name'), email: formData.get('email'),
                   uid: formData.get('uid'), password: formData.get('password') }
        });
     

    } catch (err) {
      console.error('Database error:', err);
      return fail(500, { message: 'An error occurred while saving the user' });
    }
    if (result.modifiedCount === 1) {
      redirect(303, '/users');
    } else {
      return fail(416, { message: 'Failed to save user' });
    }
  }
}