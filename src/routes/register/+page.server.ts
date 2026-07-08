import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { users } from '$lib/server/db/schema';
import bcrypt from 'bcrypt';
import type { PageServerLoad } from '../$types';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
     default: async ({request}) => {
          // Get Data
          const formData = await request.formData()
          const email = formData.get("email") as string
          const name = formData.get("name") as string
          const plainPassword = formData.get("password") as string
          const comparePlainPassword = formData.get("comparePlainPassword") as string

          // Check if Passwords do not match.
          if (comparePlainPassword !== plainPassword) {
               console.log(`The 'Password' and 'Confirm Password' fields do not match.`)
               return fail(400, { error: `The 'Password' and 'Confirm Password' fields do not match.` });

          }

          // Check if email already exists to an account.
          const checkEmailEquality = await db.select().from(users).where(eq(users.email, email))
          if (checkEmailEquality) {
               console.log('[SERVER_ERROR] Another Account with this Email is already Registered.')
               return fail(400, { error: 'Another Account with this Email is already registered.' });
          }

          const passwordHash = await bcrypt.hash(plainPassword, 12);

          const newUser = await db
               .insert(users).values({email, name, password_hash: passwordHash, id: crypto.randomUUID()}).returning({name: users.name, email: users.email})
     
          return { success: true, user: newUser }
     }
}

// Load Hook
export const load: PageServerLoad = async () => {
     const allUsers = await db.select().from(users)
     console.log(allUsers)
}