import type { PageServerLoad } from "../$types";
import { users, userMangaList } from "$lib/server/db/schema";
import { db } from "$lib/server/db";
import { asc } from "drizzle-orm";

// Get Newly Added
function getNewlyAdded() {
     const dayMilliseconds = 1000 * 60 * 60 * 24
     const date = new Date().getTime() - dayMilliseconds
     const Time = date.toString()
}

export const load: PageServerLoad = async () => {

}
