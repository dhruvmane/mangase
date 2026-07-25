<script>
     // import { AppInstance } from '$lib/modules/globals.svelte';
     import { page } from '$app/state';
     let { data } = $props()

     // Icons
     import ArrowLeft from "$lib/assets/icons/left-arrow.svg"
     import ArrowRight from "$lib/assets/icons/arrow-right.svg"
     // Beautify:
     import Star from '$lib/assets/icons/beautify/star.svg'
     import Sparkles from '$lib/assets/icons/beautify/sparkles.svg'
     import Fire from '$lib/assets/icons/beautify/fire.svg'

     import { goto } from '$app/navigation';

</script>

<!-- Main Page Section -->
<div class="border-black rounded-mangase-rounded p-2 flex flex-col gap-2 md:max-w-md lg:max-w-lg xl:max-w-xl justify-self-center w-full">
     <h1 class="text-center my-auto">Our website is heavily Work in Progress. Please use the search button to start reading manga!</h1>
     <!--      
     <div class="h-full rounded-mangase-rounded p-3 bg-mangase-bg ">
     {#if page.data.user}
          {#if data.recentlyUpdatedMangas}
               <h1 class="flex items-center gap-2 text-2xl"><img alt="b" src={Sparkles} class="block invert size-5">Recently Updated</h1>

               <div class="flex gap-x-1 overflow-x-auto whitespace-nowrap my-2 rounded">
                    <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
                    <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
                    <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
                    <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
                    <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
                    <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
                    <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
               </div>
          {:else}
               <h2 class="text-[12px] text-neutral-600">Keep track of latest Manga Chapters by bookmarking them!</h2>
          {/if}
     {:else}
          <h2 class="text-center text-[20px] text-neutral-600"><a href="/login" class="underline">Sign in</a> to stay up to date with your favourite mangas!</h2>
     {/if}
     </div>
     -->


     <!-- Most Popular Comics
     <div class="h-full rounded-mangase-rounded p-3 bg-mangase-bg ">
          <h1 class="flex items-center gap-2 text-2xl"><img alt="b" src={Fire} class="block invert size-5">Most Popular</h1>
          <div class="">

               <h2 class="my-2">Mangas</h2>
               <div class="flex gap-x-1 overflow-x-auto whitespace-nowrap my-2 rounded">
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
               </div>
          
               <h2 class="my-2">Manwhas</h2>
               <div class="flex gap-x-1 overflow-x-auto whitespace-nowrap my-2 rounded">
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
               </div>

               <h2 class="my-2">Webtoons / Web Comics</h2>
               <div class="flex gap-x-1 overflow-x-auto whitespace-nowrap my-2 rounded">
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
               </div>
          </div>
     </div>
      -->

     <!-- Recommended By People
     <div class="h-full rounded-mangase-rounded p-3 bg-mangase-bg ">
          <h1 class="flex items-center gap-2 text-[20px]"><img alt="b" src={Fire} class="block invert size-5">What People Recommend</h1>
          <div class="">
               <div class="flex gap-x-1 overflow-x-auto whitespace-nowrap my-2 rounded">
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
               </div>
          </div>
     </div>     
      -->
     <!-- Latest (Positive) Reviews
     <div class="p-5 bg-mangase-bg rounded-mangase-rounded">
          <h1>Latest Reviews</h1>
          <div class="bg-white w-full min-h-[200px] rounded my-3">
          </div>
     </div>
      -->
     <!-- Newly Added
     <div class="h-full rounded-mangase-rounded p-3 bg-mangase-bg ">
          <h1 class="flex items-center gap-2 text-2xl"><img alt="b" src={Star} class="block invert size-5">Newly Added</h1>

          <div class="">

               <h2 class="my-2">Mangas</h2>
               <div class="flex gap-x-1 overflow-x-auto whitespace-nowrap my-2 rounded">
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
               </div>
          
               <h2 class="my-2">Manwhas</h2>
               <div class="flex gap-x-1 overflow-x-auto whitespace-nowrap my-2 rounded">
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
               </div>

               <h2 class="my-2">Webtoons / Web Comics</h2>
               <div class="flex gap-x-1 overflow-x-auto whitespace-nowrap my-2 rounded">
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
                    <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
               </div>
          </div>
     </div>
      -->
</div>