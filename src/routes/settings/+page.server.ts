import { redirect, type Actions } from "@sveltejs/kit";
import { db } from '$lib/server/db'
import { users } from "$lib/server/db/schema";
import { UPLOADTHING_TOKEN } from "$env/static/private";
import { eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server"

const utapi = new UTApi({token: UPLOADTHING_TOKEN})

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
          const profilePicKey = data.get('profilePicKey') as string
          const user = locals.user

          if(!user) {
               redirect(303, '/login')
          }

          // Delete Existing User.
          let userEntry
          try {
               userEntry = await db.select({profilePicKey: users.profilePicKey, profilePicURL: users.profilePicURL, email: users.email}).from(users).where(eq(users.email, user.email))
          } catch (err) {
               console.log(err)
          }

          if (userEntry && userEntry[0].profilePicKey) {
               // Delete Old Profile Picture.
               utapi.deleteFiles([userEntry[0].profilePicKey])
          }          

          // Store Profile Pic in Locals
          user.profilePicURL = profilePicURL
          user.profilePicKey = profilePicKey

          try {
               await db.update(users).set({profilePicKey: profilePicKey}).where(eq(users.email, user.email))
          } catch (err) {
               console.log(err)
          }

     }
}