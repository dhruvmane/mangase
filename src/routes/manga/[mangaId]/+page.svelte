<!-- Manga Page -->
<script lang=ts>
     import Navbar from '$lib/components/Navbar.svelte';
     import Tags from '$lib/components/Tags.svelte'
     import { onMount } from 'svelte';
     import { goto } from '$app/navigation';

     // Icons
     import Share from '$lib/assets/icons/share.svg'
     import Language from '$lib/assets/icons/language.svg'
     import BookmarkUnadded from '$lib/assets/icons/bookmark-unadded.svg'
     import BookmarkAdded from '$lib/assets/icons/bookmark-added.svg'
     import Clock from '$lib/assets/icons/clock.svg'
     import Chapter from '$lib/assets/icons/chapter.svg'
     import { convertToProxyLink } from '$lib/modules/functions/manga.svelte.js';

     let isBookmarked = $state(false)
     let chapterLastRead: number = $state(1)

     let { data } = $props()
     let _mangaData: any = $state({})
     let isLoaded = $state(false)
     let coverArtSrc = $state("")

     onMount(() => {
          _mangaData = data.mangaData.data;
          dateStringBeautify(_mangaData.attributes.createdAt)
          coverArtSrc = convertToProxyLink(`https://uploads.mangadex.org/covers/${data.mangaId}/${data.coverFileName}`)


          isLoaded = true
     })

     function dateStringBeautify(date: string): string {
          const dateObj = new Date(date)
          const parsedDate = dateObj.getDate()
          const parsedMonthNumber = dateObj.getMonth()
          const parsedYear = dateObj.getFullYear()

          const formatted = `${parsedDate}/${parsedMonthNumber}/${parsedYear}`
          return formatted
     }

     function getTitle(dict: Record<string, string>): string {
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
     

</script>

{#if isLoaded}
<main class="m-2 p-2">
     
     <div class="mb-5">
          <Navbar />
     </div>
     
     <!-- Manga Details -->
     <div class="">
          
          <!-- Manga Cover Art -->
          <div class="m-auto my-2 mb-4 w-[310px]">
               <button class="h-full w-full" aria-label="Cover" onclick={() => {goto(`/manga/${_mangaData.mangaId}/cover`)}}>
                    <img loading="lazy" src={coverArtSrc} alt="cover" class="h-full w-full object-fit">
               </button>
          </div>
          
          <!-- Manga Bookmarkrmation -->
          <div class="bg-neutral-950 p-3 rounded-mangase-rounded md:max-w-md lg:max-w-lg xl:max-w-xl m-auto w-full">
               <h1 class="text-2xl text-center capitalize">{getTitle(_mangaData.attributes.title)}</h1>
               <h2 class="text-center">by {data.authorDetails.attributes.name}</h2>
          </div>
          
          
          <!-- More Manga Bookmarkrmation -->
          <div class="flex flex-col gap-3 mt-2 bg-black rounded-mangase-rounded p-4 md:max-w-md lg:max-w-lg xl:max-w-xl m-auto w-full">
               <!-- Manga Description -->
               <div class="p-4 bg-neutral-900 rounded-mangase-rounded">
                    <h2 class="overflow-hidden">{_mangaData.attributes.description['en']}</h2>
               </div>
               <div class="p-4 bg-neutral-900 rounded-mangase-rounded">
                    <h2 class="text-gray-500">Origination: <span class="text-white">{dateStringBeautify(_mangaData.attributes.createdAt)}</span></h2>
                    <h2 class="text-gray-500">Demographic: <span class="text-white capitalize">{_mangaData.attributes.publicationDemographic}</span></h2>
                    <h2 class="text-gray-500">Status: <span class="text-white capitalize">{_mangaData.attributes.status}</span></h2>
                    <h2 class="text-gray-500">Final Chapter: <span class="text-white">{_mangaData.attributes.lastChapter}</span></h2>
               </div>
               
               <!-- Tags -->
               <div class="flex gap-1 flex-wrap items-center rounded-mangase-rounded">
                    {#each _mangaData.attributes.tags as tagData}
                         <Tags name={tagData.attributes.name['en']} />                         
                    {/each}
               </div>
               
          </div>
          
          <!-- Reviews -->
          <!-- <div class="p-4 my-2 bg-black rounded-mangase-rounded md:max-w-md lg:max-w-lg xl:max-w-xl m-auto w-full">
               <h2>Reviews</h2>
               <div class="h-full rounded-mangase-rounded">
                    <div class="flex gap-x-1 overflow-y-auto my-2 rounded">
                         <div class="bg-neutral-50 aspect-2/1 w-full rounded shrink-0"></div>
                    </div>
               </div>
          </div> -->
          
          <!-- Buttons -->
          <div class="flex items-center gap-1 my-2 p-2 bg-neutral-950 rounded-mangase-rounded md:max-w-md lg:max-w-lg xl:max-w-xl m-auto w-full">
               <!-- {#if !isBookmarked} -->
                    <button class="p-2 rounded-mangase-rounded bg-neutral-800 flex-1 min-w-0" onclick={() => {goto(`/manga/${data.mangaId}/chapter/${data.chapterDetails.id}`)}}>Start Reading</button>
                    <!-- <button class="p-2 rounded-mangase-rounded bg-neutral-800 shrink-0" onclick={() => {isBookmarked = !isBookmarked}}>
                         <img alt="share" src={BookmarkUnadded} class="size-6 invert" title="Change Language">
                    </button> -->
               <!-- {:else}
                    <button class="p-2 rounded-mangase-rounded bg-neutral-800 flex-1 min-w-0" onclick={() => {goto(`/manga/${_mangaData.mangaId}/chapter/1`)}}>Read Chapter {chapterLastRead}</button>
                    <button class="p-2 rounded-mangase-rounded bg-neutral-800 shrink-0" onclick={() => {isBookmarked = !isBookmarked}}>
                         <img alt="share" src={BookmarkAdded} class="size-6 invert" title="Change Language">
                    </button>
               {/if} -->
               <!-- <button class="p-2 rounded-mangase-rounded bg-neutral-800 shrink-0">
                    <img alt="share" src={Language} class="size-6 invert" title="Change Language">
               </button> -->
               <!-- <button class="p-2 rounded-mangase-rounded bg-neutral-800 shrink-0">
                    <img alt="share" src={Share} class="size-6 invert" title="Share this Manga">
               </button> -->
          </div>


          <!-- Chapters -->
          <div class="my-2 p-4 rounded-mangase-rounded bg-black flex flex-col gap-2 md:max-w-md lg:max-w-lg xl:max-w-xl m-auto w-full">
               <div class="grid grid-cols-[75%_25%] items-center rounded-mangase-rounded py-2">
                    <div class="flex gap-1">
                         <span class="text-center">Chapters</span>
                    </div>
               </div>
               
               <div class="flex flex-col gap-1">
                    {#each data.chapterDetails as chapter}
                         <button class="p-2 grid grid-cols-[20%_80%] items-center rounded bg-neutral-900" aria-label="chapter" onclick={() => {
                              
                                   const _nextChapter = (parseInt(chapter.attributes.chapter) + 1).toString()

                                   goto(`/manga/${data.mangaId}/chapter/${chapter.id}?${new URLSearchParams({
                                      nextChapter: _nextChapter  
                                   })}`)}
                              
                              }>
                              <h1 class="mr-auto">Ch. {chapter.attributes.chapter}</h1>
                              {#if chapter.attributes.title}
                                   <h1 class="ml-auto">{chapter.attributes.title}</h1>
                              {:else}
                                   <h1 class="ml-auto">-</h1>
                              {/if}
                         </button>
                    {/each}
               </div>
          </div>
          
          
          
          <!-- More Like This -->
          <!-- <div class="p-4 my-2 bg-black rounded-mangase-rounded md:max-w-md lg:max-w-lg xl:max-w-xl m-auto w-full">
               <h2>More Like This</h2>
               <div class="grid grid-cols-3 my-2 gap-1 rounded overflow-y-auto max-h-[400px]">
                    <button class="bg-neutral-50 aspect-3/4 rounded shrink-0" aria-label="manga" onclick={() => {goto("/manga/chainsaw-man/")}}></button>
                    <button class="bg-neutral-50 aspect-3/4 rounded shrink-0" aria-label="manga" onclick={() => {goto("/manga/chainsaw-man/")}}></button>
                    <button class="bg-neutral-50 aspect-3/4 rounded shrink-0" aria-label="manga" onclick={() => {goto("/manga/chainsaw-man/")}}></button>
               </div>
          </div> -->
          
          <!-- From This Author -->
          <!-- <div class="p-4 my-2 bg-black rounded-mangase-rounded md:max-w-md lg:max-w-lg xl:max-w-xl m-auto w-full">
               <h2>From This Author</h2>
               <div class="grid grid-cols-3 my-2 gap-1 rounded overflow-y-auto max-h-[400px]">
                    <button class="bg-neutral-50 aspect-3/4 rounded shrink-0" aria-label="manga" onclick={() => {goto("/manga/chainsaw-man/")}}></button>
                    <button class="bg-neutral-50 aspect-3/4 rounded shrink-0" aria-label="manga" onclick={() => {goto("/manga/chainsaw-man/")}}></button>
                    <button class="bg-neutral-50 aspect-3/4 rounded shrink-0" aria-label="manga" onclick={() => {goto("/manga/chainsaw-man/")}}></button>
                    <button class="bg-neutral-50 aspect-3/4 rounded shrink-0" aria-label="manga" onclick={() => {goto("/manga/chainsaw-man/")}}></button>
                    <button class="bg-neutral-50 aspect-3/4 rounded shrink-0" aria-label="manga" onclick={() => {goto("/manga/chainsaw-man/")}}></button>
                    <button class="bg-neutral-50 aspect-3/4 rounded shrink-0" aria-label="manga" onclick={() => {goto("/manga/chainsaw-man/")}}></button>
               </div>
          </div> -->

     </div>
</main>
{/if}