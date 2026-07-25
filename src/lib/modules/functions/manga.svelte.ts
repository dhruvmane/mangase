import { AppInstance, type searchData } from "../globals.svelte";

const API_URL = 'https://api.mangadex.org';

interface ISearchParams {
     title?: string,
     includedTags?: string[],
     excludedTags?: string[],
     finalOrderQuery?: {},
     filters?: {}
}

export enum chapterDataEnum {
     'data',
     'data-saver'
}

interface IChapterObject {
     page: number,
     url: string
}

async function getChaptersSource (chapterId: string, type: chapterDataEnum) {
     const response = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`)
     const data = await response.json()
     if (data) {
          // console.log(data)
     }
     let list: any[] = []
     let pageCount = 0;
     const chapterData = data.chapter
     chapterData.data.forEach((chapter: any) => {
          const _url = `${data.baseUrl}/${chapterDataEnum[type]}/${data.chapter.hash}/${chapter}` as string
          const chapter_object = {
               page: pageCount++,
               url: _url
          }
          list.push(chapter_object)
     })
     return list
}

async function getMangaCoverArt(manga: any) {
     let coverData: any;
     if (manga.relationships) {
          coverData = manga.relationships.find((relation: any) => relation.type === "cover_art")
     }
     const fileName = coverData.attributes.fileName
     return `https://uploads.mangadex.org/covers/${manga.id}/${fileName}` as string
}

async function getAuthor(manga: any) {
     let authorData;
     if (manga.relationships) {
          authorData = manga.relationships.find((relation: any) => relation.type === "author")
     }
     return authorData
}

export async function getManga(mangaId: string) {
     const response = await fetch(`${API_URL}/manga/${mangaId}?includes[]=chapter`)
     const data = await response.json()
     return data
}

export function convertToProxyLink(link: string) {
     const proxyLink = '/api/proxy-image?url=' + encodeURIComponent(link)
     console.log(proxyLink)
     return proxyLink
}

export async function getAllChapters(mangaData: any, query: any) {
     const mangaId = mangaData.data.id
     const _query = new URLSearchParams({
          limit: query.limit,
          'order[chapter]': 'asc',
          includeExternalUrl: '0'
     })
     
     const url = `https://api.mangadex.org/manga/${mangaId}/feed?${_query}`
     // console.log(url)
     const _fetch = await fetch(url)
     const response = await _fetch.json()
     const responseArray = response.data
     
     return responseArray
}

export function getTitle(dict: Record<string, string>): string {
     let keys = Object.keys(dict)
     let title: string;
     let key: string = '';
     keys.forEach((lang: string) => {
          if (lang === 'en' || lang === 'ja-ro') {
               key = lang
          }
     })
     title = dict[key]
     return title                  
}

async function searchMangaQuery(q: string) { 
     if (q === "") return
     if (AppInstance._USER_CONFIG) {
          AppInstance._USER_CONFIG._SEARCH_QUERY = q
     }
     // Log Search Activity
     console.log(`USER_ACTION: Searched for '${q}' in /search.`)
     const response = await fetch(`/api/search?${new URLSearchParams({ q, limit: '100' })}`)
     const data = await response.json()
     if (AppInstance._USER_CONFIG && AppInstance._USER_CONFIG?._SEARCH) {
          AppInstance._USER_CONFIG._SEARCH = data.data
          AppInstance._USER_CONFIG._SEARCH?.forEach(async (result: searchData) => {
               result.coverString = await getMangaCoverArt(result)
               result.authorDetails = await getAuthor(result)
          })
     }
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

export { searchMangaQuery }
export { getMangaCoverArt, getAuthor, getChaptersSource, getMangaCoverName }
