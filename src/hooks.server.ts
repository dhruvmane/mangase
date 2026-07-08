import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import { users, sessions } from "$lib/server/db/schema";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
     const token = event.cookies.get("session")
     if (!token) {
          event.locals.user = null
          return resolve(event)
     }

     const result = await db.select({userId: users.id, email: users.email, expiresAt: sessions.expiresAt, name: users.name})
          .from(sessions).innerJoin(users, eq(sessions.userId, users.id))

     // Delete Session once it expires.
     if (!result || result[0].expiresAt < new Date()) {
          event.locals.user = null
          event.cookies.delete('session', {path: '/'})
          return resolve(event)
     }

     event.locals.user = {id: result[0].userId, email: result[0].email, name: result[0].name}
     
     // IMPORTANT 
     return resolve(event);
}