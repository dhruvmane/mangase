import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { mangas } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { getAllChapters, getAuthor, getMangaCoverName } from "$lib/modules/functions/manga.svelte";

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
          } else {
               _mangaData = await db.select().from(mangas).where(eq(mangas.mangaSlug, _id))
               if (_mangaData.length > 0) {
                    console.log(`MANGA Exists as Slug!`)
                    isInDatabase = true
               }
          }

     } catch (error) {
          console.log(`Error! ${error}`)
     }

     if (isInDatabase) {
          return
     }

     // If doesn't exist:
     const data = await fetch(`https://api.mangadex.org/manga/${id}`)
     const response = await data.json()
     let title 

     if(response.data.attributes) {
          title = response.data.attributes.title['ja-ro'] as string
     }

     // Jujutsu Kaisen -> jujutsu-kaisen
     let slug: string = ""
     if(title) {
          slug = title.toLowerCase().split(" ").join("-")
     } else {
          title = response.data.attributes.title['en'] as string
     }

     await db.insert(mangas).values({
          id: crypto.randomUUID(),
          mangaSlug: slug,
          mangaStatus: 'ONGOING',
          title,
          mangaDexMangaId: _id
     })

     console.log(`New Manga Entry Added: Slug: ${slug}`)
}




export const load: PageServerLoad = async ( {params} ) => {
     
     const mangaId = params.mangaId;

     // MangaDEX

     // THIS IS IMPORTANT IN ORDER TO GET ACTUAL AUTHOR DATA.
     const includes = ['artist', 'author', 'cover_art']
     const newParams = new URLSearchParams()
     includes.forEach(item => newParams.append('includes[]', item))
     
     const mangaDataFetch = await fetch(`https://api.mangadex.org/manga/${params.mangaId}?${newParams}`)
     const mangaDataResponse = await mangaDataFetch.json()
     
     databaseCheck(mangaId)
     
     const coverFileName = await getMangaCoverName(mangaDataResponse);
     const authorDetails = await getAuthor(mangaDataResponse.data)
     const chapterDetails = await getAllChapters(mangaDataResponse, {
          limit: 300,
          translatedLanguage: ['en']
     })

     // console.log(chapterDetails)
     // Push CoverArt to Database
     // await db.update(mangas).set({mangaCover: `https://uploads.mangadex.org/covers/${params.mangaId}/${coverFileName}`}).where(eq(mangas.id, params.mangaId))
     
     return {mangaId, mangaData: mangaDataResponse, coverFileName, authorDetails, chapterDetails}
}