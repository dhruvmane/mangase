import type { PageServerLoad } from "../$types";
import { users, userMangaList } from "$lib/server/db/schema";
import { db } from "$lib/server/db";
import { asc } from "drizzle-orm";

export const load: PageServerLoad = async () => {

     let recentlyUpdatedMangas;

     try {
          recentlyUpdatedMangas = await db.select().from(userMangaList).where(asc(userMangaList.lastUpdatedAt))
     } catch (error) {
     }

     return({
               recentlyUpdatedMangas
          })

}
