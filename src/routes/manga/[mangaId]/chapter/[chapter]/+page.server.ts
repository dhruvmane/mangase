import { json } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { chapterDataEnum, getAllChapters, getChaptersSource, getManga } from "$lib/modules/functions/manga.svelte";



export const load: PageServerLoad = async ( {params, url} ) => {
     const mangaId = params.mangaId;
     const chapter = params.chapter;
     let nextChapter = url.searchParams.get("nextChapter") ?? ''
     
     const chapterData = await getChaptersSource(chapter, chapterDataEnum["data"])
     const mangaData = await getManga(mangaId)
     let mangaChapterDetails = await getAllChapters(mangaData, {
          limit: 100
     })

     nextChapter = (parseInt(nextChapter) + 1).toString()
     const nextChaptersData = mangaChapterDetails.filter((chapter: any) => chapter.attributes.chapter === nextChapter)
     return {mangaId: mangaId, chapter: chapter, chapterData, mangaData, nextChaptersData, nextChapter}
}