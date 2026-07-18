import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { mangas } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { getAuthor } from "$lib/modules/functions/manga.svelte";

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

async function getMangaCoverName(mangaData: any): Promise<string> {

     // Cover Page for Manga Page
     const coverData = mangaData.data.relationships.find((relation: any) => relation.type === "cover_art")
     const coverId = coverData.id;
     const src = `https://api.mangadex.org/cover/${coverId}`
     const response = await fetch(src)
     const data = await response.json()

     return data.data.attributes.fileName as string
}

async function getAllChapters(mangaData: any, query: any) {
     const mangaId = mangaData.data.id
     
     const _query = new URLSearchParams({
          limit: query.limit
     })

     if (query.translatedLanguage) {
          query.translatedLanguage.forEach((item: string) => _query.append("translatedLanguage[]", item))
     }

     const _fetch = await fetch(`https://api.mangadex.org/manga/${mangaId}/feed?${_query}`)
     const response = await _fetch.json()
     return response.data.sort((a, b) => a.attributes.chapter - b.attributes.chapter)
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
          translatedLanguage: ['en', 'ja-ro']
     })

     // console.log(chapterDetails)
     // Push CoverArt to Database
     // await db.update(mangas).set({mangaCover: `https://uploads.mangadex.org/covers/${params.mangaId}/${coverFileName}`}).where(eq(mangas.id, params.mangaId))
     
     return {mangaId, mangaData: mangaDataResponse, coverFileName, authorDetails, chapterDetails}
}