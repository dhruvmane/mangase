import type { PageServerLoad } from "../$types";
import { users, userMangaList } from "$lib/server/db/schema";
import { db } from "$lib/server/db";
import { asc } from "drizzle-orm";

// Get Newly Added
function getNewlyAdded() {
     const dayMilliseconds = 1000 * 60 * 60 * 24
     const date = new Date().getTime() - dayMilliseconds
     const Time = date.toString()
     
     const dataIncludes = ['artist', 'author', 'cover_art', 'manga']
     const params = new URLSearchParams({
          hasAvailableChapters: "true",
          createdAtSince: Time,
     })
     
     dataIncludes.forEach(element => {
          params.append('includes[]', element)
     });


     const url = `https://api.mangadex.org/manga?${params}`
}

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
