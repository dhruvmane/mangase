import { db } from "$lib/server/db"
import { task } from "$lib/server/db/schema"
import { AppInstance } from "$lib/modules/globals.svelte"

import type { PageServerLoad } from "./$types"
 
export const load: PageServerLoad = async () => {
     // Fetch all records from the users table using Drizzle
     const allTasks = await db.select().from(task);
     AppInstance._TASKS = allTasks     
     console.log(allTasks)
}