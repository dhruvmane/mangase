import { db } from '$lib/server/db';
import { mangas } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from "@sveltejs/kit";
import { sql } from 'drizzle-orm';


export const GET: RequestHandler = async ({ url }) => {
     // Log
     console.log("SERVER: Recieved 'Search' Request from User.")
     
     let title = url.searchParams.get("q") ?? ""

     // const includes = ['author', 'artist', 'cover_art']
     // let params = new URLSearchParams({
          // title: title,
     // })

     // includes.forEach(item => params.append('includes[]', item))

     // MANGADEX
     // const response = await fetch(`${API_URI}/manga?${params}`)

     // return json(results);
};