<!-- Manga Page -->
<script>
     import Navbar from '$lib/components/Navbar.svelte';
     import Tags from '$lib/components/Tags.svelte'
     import { onMount } from 'svelte';

     // Icons
     import Share from '$lib/assets/icons/share.svg'
     import Language from '$lib/assets/icons/language.svg'
     import Info from '$lib/assets/icons/info.svg'
     import Clock from '$lib/assets/icons/clock.svg'
     import Chapter from '$lib/assets/icons/chapter.svg'
     import Uploaders from '$lib/assets/icons/profile.svg'
    import Footer from '$lib/sections/Footer.svelte';

     let { data } = $props()
     let _mangaData;

     onMount(() => {
          _mangaData = data;
     })

</script>

<main class="m-2 p-2">
     <Navbar />

     <!-- Manga Details -->
     <div class="p-2">
     
          <!-- Manga Cover Art -->
          <div class="justify-self-center my-2 mb-4 aspect-3/4 w-[300px] bg-neutral-50"></div>

          <!-- Manga Information -->
          <div class="bg-neutral-950 p-3 rounded-2xl">
               <h1 class="text-center">Chainsaw Man</h1>
               <h2 class="text-center">by Tatsuki Fujimoto</h2>
          </div>

          <!-- Buttons -->
          <div class="flex items-center gap-1 justify-self-center m-2 p-2 bg-neutral-950 w-full rounded-2xl">
               <button class="p-2 rounded-2xl bg-neutral-800 flex-1 min-w-0">Follow</button>
               <button class="p-2 rounded-2xl bg-neutral-800 shrink-0">
                    <img alt="share" src={Share} class="size-6 invert" title="Share this Manga">
               </button>
               <button class="p-2 rounded-2xl bg-neutral-800 shrink-0">
                    <img alt="share" src={Language} class="size-6 invert" title="Change Language">
               </button>
               <button class="p-2 rounded-2xl bg-neutral-800 shrink-0">
                    <img alt="share" src={Info} class="size-6 invert" title="Change Language">
               </button>
          </div>

          <!-- More Manga Information -->
          <div class="w-full flex flex-col gap-2 bg-black rounded-2xl p-4">
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

          <!-- Chapters -->
          <div class="my-2 p-4 rounded-2xl bg-black flex flex-col gap-2">
               <div class="grid grid-cols-[75%_25%] items-center rounded-2xl py-2">
                    <img alt="share" src={Chapter} class="size-6 invert ml-2" title="Change Language">
                    <img alt="share" src={Clock} class="size-6 invert justify-self-center" title="Change Language">
               </div>

               <div class="flex flex-col gap-1">
                    <div class="p-5 grid grid-cols-[15%_60%_25%] items-center rounded bg-neutral-900"></div>
                    <div class="p-5 grid grid-cols-[15%_60%_25%] items-center rounded bg-neutral-900"></div>
                    <div class="p-5 grid grid-cols-[15%_60%_25%] items-center rounded bg-neutral-900"></div>
               </div>
          </div>
     </div>

</main>