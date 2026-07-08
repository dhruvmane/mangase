<script>

     import { AppInstance } from '$lib/modules/globals.svelte';

     // Icons
     // Beautify:
     import Star from '$lib/assets/icons/beautify/star.svg'
     import Sparkles from '$lib/assets/icons/beautify/sparkles.svg'
     import Fire from '$lib/assets/icons/beautify/fire.svg'
     import { goto } from '$app/navigation';
</script>

<!-- Main Page Section -->
<div class="border-black bg-mangase-bg rounded-2xl p-2 flex flex-col gap-2 md:max-w-md lg:max-w-lg xl:max-w-xl justify-self-center w-full">
     <div class="h-full rounded-2xl p-2">
     {#if AppInstance._USER_CONFIG}
          <h1 class="flex items-center gap-2 text-2xl"><img alt="b" src={Sparkles} class="block invert size-5">Recently Updated</h1>
          <div class="flex gap-x-1 overflow-x-auto whitespace-nowrap my-2 rounded">
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
          </div>
     
     {:else}
          <h2 class="text-center text-[20px] text-neutral-600"><a href="/login" class="underline">Sign in</a> to stay up to date with your favourite mangas!</h2>
     {/if}
     </div>
     <div class="h-full rounded-2xl p-2">
          <h1 class="flex items-center gap-2 text-2xl"><img alt="b" src={Star} class="block invert size-5">Newly Added</h1>

          <div class="flex gap-x-1 overflow-x-auto whitespace-nowrap my-2 rounded">
               <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
               <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
               <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
               <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
          </div>
     </div>
     <div class="h-full rounded-2xl p-2">
          <h1 class="flex items-center gap-2 text-2xl"><img alt="b" src={Fire} class="block invert size-5">Most Popular</h1>
          <div class="flex gap-x-1 overflow-x-auto whitespace-nowrap my-2 rounded">
               <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
               <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
               <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
               <button class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0" onclick={() => {goto('/manga/chainsaw-man')}} aria-label="manga"></button>
          </div>
     </div>
</div>