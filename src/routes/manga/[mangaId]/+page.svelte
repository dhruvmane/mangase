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

     let isBookmarked = $state(false)
     let chapterLastRead: number = $state(1)

     interface Idata {
          mangaId: string
     }

     let { data } = $props()
     let _mangaData: Idata;

     onMount(() => {
          _mangaData = data;
     })

</script>

<main class="m-2 p-2">

     <div class="mb-5">
          <Navbar />
     </div>

     <!-- Manga Details -->
     <div class="">
     
          <!-- Manga Cover Art -->
          <div class="m-auto my-2 mb-4 aspect-3/4 w-[300px] bg-neutral-50">
               <button class="h-full w-full" aria-label="Cover" onclick={() => {goto(`/manga/${_mangaData.mangaId}/cover`)}}></button>
          </div>

          <!-- Manga Bookmarkrmation -->
          <div class="bg-neutral-950 p-3 rounded-2xl md:max-w-md lg:max-w-lg xl:max-w-xl m-auto w-full">
               <h1 class="text-center">Chainsaw Man</h1>
               <h2 class="text-center">by Tatsuki Fujimoto</h2>
          </div>

          
          <!-- More Manga Bookmarkrmation -->
          <div class="flex flex-col gap-2 mt-2 bg-black rounded-2xl p-4 md:max-w-md lg:max-w-lg xl:max-w-xl m-auto w-full">
               <div class="p-4 bg-neutral-900 rounded-2xl">
                    <h2>Origination: </h2>
                    <h2>Demographic: </h2>
                    <h2>Status: </h2>
                    <h2>Translation: </h2>
                    <h2>Final Chapter: </h2>
               </div>
               
               <!-- Tags -->
               <div class="flex gap-1 flex-wrap items-center py-1 rounded-2xl">
                    <Tags />
               </div>
               
               <!-- Manga Description -->
               <div class="p-4 bg-neutral-900 rounded-2xl">
                    <h2 class="">Description</h2>
               </div>
          </div>
          <!-- Buttons -->
          <div class="flex items-center gap-1 my-2 p-2 bg-neutral-950 rounded-2xl md:max-w-md lg:max-w-lg xl:max-w-xl m-auto w-full">
               {#if !isBookmarked}
                    <button class="p-2 rounded-2xl bg-neutral-800 flex-1 min-w-0" onclick={() => {goto(`/manga/${_mangaData.mangaId}/chapter/1`)}}>Start Reading</button>
                    <button class="p-2 rounded-2xl bg-neutral-800 shrink-0" onclick={() => {isBookmarked = !isBookmarked}}>
                         <img alt="share" src={BookmarkUnadded} class="size-6 invert" title="Change Language">
                    </button>
               {:else}
                    <button class="p-2 rounded-2xl bg-neutral-800 flex-1 min-w-0" onclick={() => {goto(`/manga/${_mangaData.mangaId}/chapter/1`)}}>Read Chapter {chapterLastRead}</button>
                    <button class="p-2 rounded-2xl bg-neutral-800 shrink-0" onclick={() => {isBookmarked = !isBookmarked}}>
                         <img alt="share" src={BookmarkAdded} class="size-6 invert" title="Change Language">
                    </button>
               {/if}
               <button class="p-2 rounded-2xl bg-neutral-800 shrink-0">
                    <img alt="share" src={Language} class="size-6 invert" title="Change Language">
               </button>
               <button class="p-2 rounded-2xl bg-neutral-800 shrink-0">
                    <img alt="share" src={Share} class="size-6 invert" title="Share this Manga">
               </button>
          </div>

          <!-- Chapters -->
          <div class="my-2 p-4 rounded-2xl bg-black flex flex-col gap-2 md:max-w-md lg:max-w-lg xl:max-w-xl m-auto w-full">
               <div class="grid grid-cols-[75%_25%] items-center rounded-2xl py-2">
                    <div class="flex gap-1">
                         <img alt="share" src={Chapter} class="size-6 invert ml-2" title="Change Language">
                         <span class="text-center">Chapters</span>
                    </div>
                    <img alt="share" src={Clock} class="size-6 invert m-auto" title="Change Language">
               </div>

               <div class="flex flex-col gap-1">
                    <button class="p-2 grid grid-cols-[15%_60%_25%] items-center rounded bg-neutral-900" aria-label="chapter" onclick={() => {goto(`/manga/${_mangaData.mangaId}/chapter/1`)}}>Ch. 1</button>
               </div>
          </div>
          
          <!-- Reviews -->
          <div class="p-4 my-2 bg-black rounded-2xl md:max-w-md lg:max-w-lg xl:max-w-xl m-auto w-full">
               <h2>Reviews</h2>
               <div class="h-full rounded-2xl">
                    <div class="flex gap-x-1 overflow-y-auto my-2 rounded">
                         <div class="bg-neutral-50 aspect-4/1 w-full rounded shrink-0"></div>
                         <div class="bg-neutral-50 aspect-4/1 w-full rounded shrink-0"></div>
                    </div>
               </div>
          </div>

          <!-- More Like This -->
          <div class="p-4 my-2 bg-black rounded-2xl md:max-w-md lg:max-w-lg xl:max-w-xl m-auto w-full">
               <h2>More Like This</h2>
               <div class="grid grid-cols-3 my-2 gap-1 rounded overflow-y-auto max-h-[400px]">
                    <button class="bg-neutral-50 aspect-3/4 rounded shrink-0" aria-label="manga" onclick={() => {goto("/manga/chainsaw-man/")}}></button>
                    <button class="bg-neutral-50 aspect-3/4 rounded shrink-0" aria-label="manga" onclick={() => {goto("/manga/chainsaw-man/")}}></button>
                    <button class="bg-neutral-50 aspect-3/4 rounded shrink-0" aria-label="manga" onclick={() => {goto("/manga/chainsaw-man/")}}></button>
               </div>
          </div>
          
          <!-- From This Author -->
          <div class="p-4 my-2 bg-black rounded-2xl md:max-w-md lg:max-w-lg xl:max-w-xl m-auto w-full">
               <h2>From This Author</h2>
               <div class="grid grid-cols-3 my-2 gap-1 rounded overflow-y-auto max-h-[400px]">
                    <button class="bg-neutral-50 aspect-3/4 rounded shrink-0" aria-label="manga" onclick={() => {goto("/manga/chainsaw-man/")}}></button>
                    <button class="bg-neutral-50 aspect-3/4 rounded shrink-0" aria-label="manga" onclick={() => {goto("/manga/chainsaw-man/")}}></button>
                    <button class="bg-neutral-50 aspect-3/4 rounded shrink-0" aria-label="manga" onclick={() => {goto("/manga/chainsaw-man/")}}></button>
                    <button class="bg-neutral-50 aspect-3/4 rounded shrink-0" aria-label="manga" onclick={() => {goto("/manga/chainsaw-man/")}}></button>
                    <button class="bg-neutral-50 aspect-3/4 rounded shrink-0" aria-label="manga" onclick={() => {goto("/manga/chainsaw-man/")}}></button>
                    <button class="bg-neutral-50 aspect-3/4 rounded shrink-0" aria-label="manga" onclick={() => {goto("/manga/chainsaw-man/")}}></button>
               </div>
          </div>

     </div>
</main>