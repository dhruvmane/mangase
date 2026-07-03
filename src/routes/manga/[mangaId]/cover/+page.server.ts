import { json } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ( {params} ) => {
     const mangaId = params.mangaId;
     return {mangaId: mangaId}
}