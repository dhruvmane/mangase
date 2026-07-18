import { AppInstance } from '$lib/modules/globals.svelte';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from "@sveltejs/kit";

const API_URI = "https://api.mangadex.org"

export const GET: RequestHandler = async ({ url }) => {
     // Log
     console.log("SERVER: Recieved 'Search' Request from User.")
     
     let title = url.searchParams.get("q") ?? ""

     const includes = ['author', 'artist', 'cover_art']
     let params = new URLSearchParams({
          title: title,
     })

     includes.forEach(item => params.append('includes[]', item))

     // MANGADEX
     const response = await fetch(`${API_URI}/manga?${params}`)
     const data = await response.json()

     return json(data);
};