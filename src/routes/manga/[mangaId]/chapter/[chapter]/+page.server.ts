import { json } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { chapterDataEnum, getChaptersSource, getManga } from "$lib/modules/functions/manga.svelte";


export const load: PageServerLoad = async ( {params} ) => {
     const mangaId = params.mangaId;
     const chapter = params.chapter;
     
     const chapterData = await getChaptersSource(chapter, chapterDataEnum["data"])
     const mangaData = await getManga(mangaId)
     

     return {mangaId: mangaId, chapter: chapter, chapterData, mangaData}
}