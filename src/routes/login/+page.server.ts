import type { PageServerLoad } from '../$types';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { users } from '$lib/server/db/schema';
import bcrypt from 'bcrypt';
import { createSession } from '$lib/server/auth';

export const actions: Actions = {
     default: async ({request, cookies}) => {
          const formData = await request.formData()
          const nameOrEmail = formData.get('nameOrEmail') as string
          const plainPassword = formData.get('password') as string

          // Get Data
          const emailCheckRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
          const isEmail = emailCheckRegex.test(nameOrEmail)
          
          // If user creds are found:
          let intendedUser

          if (isEmail) {
               // input is an email, check for emails.
               intendedUser = await db.select().from(users).where(eq(users.email, nameOrEmail))
          } else {
               // input is a username/name, check for name.
               intendedUser = await db.select().from(users).where(eq(users.name, nameOrEmail))
          }

          // If User Not Found:
          if (!intendedUser) {
               console.log('[SERVER_ERROR] User Not Found.')
               return fail(400, { error: 'User Not Found.' });
          }


          // Check if the password is valid.
          const passwordIsValid = await bcrypt.compare(plainPassword, intendedUser[0].password_hash)
          if (!passwordIsValid) {
               console.log('[SERVER_ERROR] Password is Invalid.')
               return fail(400, { error: 'Password is Invalid.' });
          }

          // Store Cookies (Log the user in.)
          const { token, expiresAt } = await createSession(intendedUser[0].id)

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

export const load: PageServerLoad = async ({locals}) => {
     if (locals.user) {
          console.log("[SERVER] USER is Already Logged In. Redirecting to Home Page.")
          redirect(303, '/home')
     }
}