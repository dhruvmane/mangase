<script>
    import Navbar from '$lib/components/Navbar.svelte';
    import Advert from '$lib/sections/Advert.svelte';

     // Icons
     import Home from '$lib/assets/icons/home.svg'
     import NextChapter from '$lib/assets/icons/next-chapter.svg'
     import { goto } from '$app/navigation';

     let {data} = $props()
     let nextChapter = (parseInt(data.chapter) + 1).toString()

     // $inspect(data)
</script>

<main class="m-2 p-2">
     <Navbar />
     <Advert />

     <!-- Manga Info -->
     <div class="mb-4 bg-black rounded-2xl md:max-w-md lg:max-w-lg xl:max-w-xl justify-self-center w-full">
          <div class="flex">
               <button class="text-3xl m-5 mb-2 bg-neutral-900 w-full p-4 rounded-2xl" onclick={() => {goto(`/manga/${data.mangaId}`)}}>Chainsaw Man</button>
          </div>
          <div class="p-4 flex flex-col gap-2">
               <div class="flex gap-1">
                    <!-- Chapter -->
                    <select class="bg-black rounded flex-1 max-w-25">
                         <option>Ch 1</option>
                    </select>
                    <!-- Language -->
                    <select class="bg-black rounded flex-1">
                         <option>Languages</option>
                    </select>
               
               </div>
               <!-- Source -->
               <select class="bg-black rounded flex-1">
                    <option>Scanlation Group</option>
               </select>
          </div>
     </div>

     <!-- Show Manga -->
     <div class="p-0.5 flex flex-col gap-2 md:max-w-md lg:max-w-lg xl:max-w-xl justify-self-center w-full">
          <div class="justify-self-center aspect-3/4 w-full shrink-0 bg-neutral-50"></div>
          <div class="justify-self-center aspect-3/4 w-full shrink-0 bg-neutral-50"></div>
          <div class="justify-self-center aspect-3/4 w-full shrink-0 bg-neutral-50"></div>
          <div class="justify-self-center aspect-3/4 w-full shrink-0 bg-neutral-50"></div>
          <div class="justify-self-center aspect-3/4 w-full shrink-0 bg-neutral-50"></div>
          <div class="justify-self-center aspect-3/4 w-full shrink-0 bg-neutral-50"></div>
          <div class="justify-self-center aspect-3/4 w-full shrink-0 bg-neutral-50"></div>
          <div class="justify-self-center aspect-3/4 w-full shrink-0 bg-neutral-50"></div>
     </div>

     <!-- HOME | Next Chapter -->
     <div class="flex my-2 gap-1 md:max-w-md lg:max-w-lg xl:max-w-xl justify-self-center w-full">
          <button class="p-2 rounded-2xl justify-items-center flex-1 bg-neutral-950" onclick={() => {goto("/home")}}>
               <img alt="home" src={Home} class="size-7 invert my-2">
               <h2 class="text-[10px]">Go to Home</h2>
          </button>
          <button class="p-2 rounded-2xl justify-items-center flex-1 bg-neutral-950" onclick={() => {goto(`/manga/${data.mangaId}/chapter/${nextChapter}`)}}>
               <img alt="home" src={NextChapter} class="size-7 invert my-2">
               <h2 class="text-[10px]">Next Chapter</h2>
          </button>
     </div>
     
     <!-- Comments -->
     <div class="p-4 my-2 bg-black rounded-2xl md:max-w-md lg:max-w-lg xl:max-w-xl justify-self-center w-full">
          <h2>Comments</h2>
          <div class="h-full rounded-2xl">
               <div class="flex gap-x-1 overflow-y-auto my-2 rounded">
                    <div class="bg-neutral-50 aspect-4/1 w-full rounded shrink-0"></div>
                    <div class="bg-neutral-50 aspect-4/1 w-full rounded shrink-0"></div>
               </div>
          </div>
     </div>

     <!-- From your Bookmarks -->
     <div class="h-full rounded-2xl p-4 bg-black md:max-w-md lg:max-w-lg xl:max-w-xl justify-self-center w-full">
          <h2 class="">From your Bookmarks</h2>
          <div class="flex gap-x-1 overflow-x-auto whitespace-nowrap my-2 rounded">
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
          </div>
     </div>
     
     <!-- From This Author -->
     <div class="p-4 my-2 bg-black rounded-2xl md:max-w-md lg:max-w-lg xl:max-w-xl justify-self-center w-full">
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


</main>
