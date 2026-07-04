const baseUrl = 'https://api.mangadex.org';


interface ISearchParams {
     title?: string,
     includedTags?: string[],
     excludedTags?: string[],
     finalOrderQuery?: {},
     filters?: {}
}

async function getManga(searchParams: ISearchParams) {
     const query: Record<string, string> = {};

     if (searchParams.title) query.title = searchParams.title;
     
     if (searchParams.includedTags?.length) {
          query.includedTags = searchParams.includedTags.join(',');
     }

     if (searchParams.excludedTags?.length) {
          query.excludedTags = searchParams.excludedTags.join(',');
     }

     if (searchParams.finalOrderQuery) {
          query.finalOrderQuery = JSON.stringify(searchParams.finalOrderQuery);
     }
     
     if (searchParams.filters) {
          query.filters = JSON.stringify(searchParams.filters);
     }

     const params = new URLSearchParams(query)

     const response = await fetch(`${baseUrl}/manga?${params}`, {
          method: 'GET'
     })     
          
     const data = await response.json();
     return data
}

async function getMangaCovers(mangaId: string, coverFileName: string) {

     let routerURL = `https://api.mangadex.org`
     // Get List of Covers
     const coversList = await (await fetch(`${routerURL}?manga[]=${mangaId}`)).json()
     console.log(coversList);
     
     // Get Main Cover Data:
     const response = await fetch(`https://uploads.mangadex.org/covers/${mangaId}/${coverFileName}`, {
          method: "GET"
     })
}