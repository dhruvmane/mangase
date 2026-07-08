import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { users } from '$lib/server/db/schema';
import bcrypt from 'bcrypt';
import type { PageServerLoad } from '../$types';
import { fail, redirect } from '@sveltejs/kit';
import { createSession } from '$lib/server/auth';

export const actions: Actions = {
     default: async ({request, cookies}) => {
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
          
          // Check if username is already taken.
          const checkNamePreexistance = await db.select().from(users).where(eq(users.name, name))
          if (checkNamePreexistance) {
                    console.log('[SERVER_ERROR] Username is Already Taken.')
                    return fail(400, { error: 'Username is Already Taken.' });
          }

          const passwordHash = await bcrypt.hash(plainPassword, 12);
          const generatedUserId = crypto.randomUUID()
          
          // Insert to DB
          const newUser = await db
               .insert(users).values({email, name, password_hash: passwordHash, id: crypto.randomUUID()}).returning({name: users.name, email: users.email})
          
          // Store Session Token on Register/Login
          const {token, expiresAt} = await createSession(generatedUserId)

          cookies.set("session", token, {
               path: "/",
               httpOnly: true,
               secure: true,
               sameSite: "lax",
               expires: expiresAt
          })
          
          throw redirect(303, '/home')
     }
}

// Load Hook
export const load: PageServerLoad = async () => {
     const allUsers = await db.select().from(users)
     console.log(allUsers)
}