import { json } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ( {params} ) => {
     const mangaId = params.mangaId;
     const chapter = params.chapter;
     return {mangaId: mangaId, chapter: chapter}
}