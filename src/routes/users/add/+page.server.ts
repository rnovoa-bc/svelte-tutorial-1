import { connectToDatabase } from "$lib/server/db";
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

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
      result = await db.collection('users').insertOne(
        {
          name: formData.get('name'), email: formData.get('email'),
          uid: formData.get('uid'), password: formData.get('password')
        });
      

    } catch (err) {
      console.error('Database error:', err);
      return fail(500, {message: 'A big problem has arisen'});
    }
    if (result.insertedId) {
      redirect(303, '/users');
      
    } else {
      return fail(416, {message: 'Unable to create a new user'});
    }
    
  }
}