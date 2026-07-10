import { redirect, type Actions } from "@sveltejs/kit";
import { db } from '$lib/server/db'
import { users } from "$lib/server/db/schema";
import { UPLOADTHING_MANGASE } from "$env/static/private";
import { eq } from "drizzle-orm";

export const actions: Actions = {
     logout: async ({ cookies, locals }) => {

          // Delete Sessions
          cookies.delete('session', {"path": "/"})

          // Delete user locals.
          locals.user = null

          throw redirect(303, '/login');
     },

     uploadProfilePic: async ({request, locals}) => {
          const data = await request.formData()
          const profilePicURL = data.get("profilePicURL") as string
          const user = locals.user

          if(!user) {
               redirect(303, '/login')
          }

          // Store Profile Pic in Locals
          user.profilePicURL = profilePicURL

          await db.update(users).set({profilePicURL: profilePicURL}).where(eq(users.email, user.email))

     }
}