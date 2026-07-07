<script lang=ts>
     // Icons
     import Search from '$lib/assets/icons/search.svg'
     import Profile from '$lib/assets/icons/profile.svg'
     import Settings from '$lib/assets/icons/options.svg'
     import Down from '$lib/assets/icons/down.svg'
     import Logo from '$lib/assets/favicon/favicon.svg'

     import { goto } from '$app/navigation';

     import { searchMangaQuery } from '$lib/modules/functions/manga.svelte'

     let searchQuery: string = $derived("");
     let { state = "MAIN" } = $props()
     let searchBarState = $derived(state)

</script>

<main class="flex justify-self-center w-full bg-black md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl items-center h-[50px] mb-2 border-neutral-500 p-2">
     {#if searchBarState !== "SEARCH"}
     <div>
          <!-- Mangase Button -->
          <button class="bg-neutral-900 flex items-center size-9 text-[15px] rounded-2xl" onclick={() => {goto("/home")}}>
               <img src={Logo} alt="logo">
          </button>
          
     </div>
     {/if}
     
     {#if searchBarState === "SEARCH"}
     <div class="p-2 text-white flex gap-2">
          <input type="text" bind:value={searchQuery} class="w-full h-[20%] bg-neutral-950 rounded-2xl border-0 focus:ring-0 px-5">
          <!-- Search Button -->
          <button class="bg-neutral-900 p-2 rounded-2xl shrink-0" onclick={() => {searchMangaQuery(searchQuery)}}>
               <img alt="search" src={Search} class="invert size-5">
          </button>
     </div>
     
     {/if}

     
     <div class="ml-auto">
          
          {#if searchBarState === "MAIN"}
          <!-- Search Button -->
          <button class="bg-neutral-900 p-2 rounded-2xl" onclick={() => {goto("/search"); searchBarState = "SEARCH"}}>
               <img alt="search" src={Search} class="invert size-5">
          </button>
          <!-- Profile -->
          <button class="bg-neutral-900 p-2 rounded-2xl" onclick={() => {goto("/user/barden")}}>
               <img alt="profile" src={Profile} class="invert size-5">
          </button>
          
          <!-- Settings -->
          <button class="bg-neutral-900 p-2 rounded-2xl" onclick={() => {goto("/settings")}}>
               <img alt="setting" src={Settings} class="invert size-5">
          </button>
          {/if}

          {#if searchBarState === "SEARCH"}
               <!-- DOWN -->
               <button class="bg-neutral-900 p-2 rounded-2xl shrink-0" onclick={() => {searchBarState = "MAIN"}}>
                    <img alt="search" src={Down} class="invert size-5">
               </button>
          {/if}
          
          
          
     </div>
</main>