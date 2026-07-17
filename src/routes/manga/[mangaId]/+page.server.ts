import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { mangas } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

// Check if it exists in Database, if not, add it.
async function databaseCheck(id: string) {
     let _id = id
     let _mangaData
     let isInDatabase = false

     try {

          // Delete Empty Data
          // Get Manga Data
          _mangaData = await db.select().from(mangas).where(eq(mangas.mangaDexMangaId, _id))

          if (_mangaData.length > 0) {
               console.log(`MANGA Data Exists!`)
               isInDatabase = true
          }

     } catch (error) {
          console.log(`Error! ${error}`)
     }

     if (isInDatabase) {
          return true
     }

     // If doesn't exist:
     // const data = await fetch(`https://api.mangadex.org/manga/${id}`)
     // const response = await data.json()
     // // const title = response.data.attributes.title['ja-ro'] as string

     // // Jujutsu Kaisen -> jujutsu-kaisen
     // const slug = title.toLowerCase().split(" ").join("-")
     
     // await db.insert(mangas).values({
     //      id: crypto.randomUUID(),
     //      mangaSlug: slug,
     //      mangaStatus: 'ONGOING',
     //      title,
     //      mangaDexMangaId: _id
     // })

     // console.log(`New Manga Entry Added: Slug: ${slug}`)

}

async function getMangaCoverName(mangaData: any): Promise<string> {
     console.log(mangaData.data.relationships.find((relation: any) => relation.type === "cover_art"))
     const coverData = mangaData.data.relationships[2]
     const coverId = coverData.id;
     const src = `https://api.mangadex.org/cover/${coverId}`
     const response = await fetch(src)
     const data = await response.json()

     return data.data.attributes.fileName as string
}

export const load: PageServerLoad = async ( {params} ) => {
     const mangaId = params.mangaId;

     // MangaDEX
     const mangaDataFetch = await fetch(`https://api.mangadex.org/manga/${params.mangaId}`)
     const mangaDataResponse = await mangaDataFetch.json()
     
     databaseCheck(mangaId)
     
     const coverFileName = await getMangaCoverName(mangaDataResponse);

     return {mangaId: mangaId, mangaData: mangaDataResponse, coverFileName}
}