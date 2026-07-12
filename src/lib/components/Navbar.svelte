<script lang=ts>
     // Icons
     import Search from '$lib/assets/icons/search.svg'
     import Profile from '$lib/assets/icons/profile.svg'
     import Settings from '$lib/assets/icons/options.svg'
     import Down from '$lib/assets/icons/down.svg'
     import Logo from '$lib/assets/favicon/favicon.ico'

     import { page } from '$app/state'

     import { goto } from '$app/navigation';

     import { searchMangaQuery } from '$lib/modules/functions/manga.svelte'

     let profilePicURL = $derived(page.data.user?.profilePicURL ?? "")
     let searchQuery: string = $derived("");
     let { state = "MAIN" } = $props()
     let searchBarState = $derived(state)

</script>

<main class="flex m-auto w-full overflow-hidden bg-black md:max-w-sm rounded-2xl items-center h-[50px] my-2 lg:my-5 border-neutral-500 p-2">
     {#if searchBarState !== "SEARCH"}
     <div>
          <!-- Mangase Button -->
          <button class="bg-neutral-900 flex items-center size-9 text-[15px] rounded-2xl" onclick={() => {goto("/home")}}>
               <img src={Logo} alt="logo" class="object-fit">
          </button>
          
     </div>
     {/if}
     
     {#if searchBarState === "SEARCH"}
     <div class=" text-white flex gap-2 w-full">
          <input type="text" bind:value={searchQuery} onkeydown={(e) => { if(e.key === "Enter") {searchMangaQuery(searchQuery)} }} class="w-full flex-1 shrink-0 h-[20%] bg-neutral-950 rounded-2xl border-0 focus:ring-0 px-5">
          <div class="flex gap-0.5 ml-auto ">
               <!-- Search Button -->
               <button class="bg-neutral-900 p-2 rounded-2xl shrink-0" onclick={() => {searchMangaQuery(searchQuery)}}>
                    <img alt="search" src={Search} class="invert size-5 shrink-0">
               </button>
               <!-- DOWN -->
               <button class="bg-neutral-900 p-2 rounded-2xl shrink-0" onclick={() => {searchBarState = "MAIN"}}>
                    <img alt="search" src={Down} class="invert size-5">
               </button>
          </div>
     </div>
     {/if}

     
     <div class="ml-auto flex items-center gap-0.75">
          
          {#if searchBarState === "MAIN"}
          <!-- Search Button -->
          <button class="bg-neutral-900 p-2 rounded-2xl" onclick={() => {goto("/search"); searchBarState = "SEARCH"}}>
               <img alt="search" src={Search} class="invert size-5">
          </button>
          <!-- Profile -->
          {#if profilePicURL}
               <button class="bg-neutral-900 p-1 rounded-2xl" onclick={() => {goto(`/user/${page.data.user.name}`)}}>
                    <img alt="profile" src={profilePicURL} class="rounded-2xl size-7">
               </button>
          {:else}
               <button class="bg-neutral-900 p-2 rounded-2xl" onclick={() => {goto(`/login`)}}>
                    <img alt="profile" src={Profile} class="invert size-5">
               </button>
          {/if}
          
          <!-- Settings -->
          <button class="bg-neutral-900 p-2 rounded-2xl" onclick={() => {goto("/settings")}}>
               <img alt="setting" src={Settings} class="invert size-5">
          </button>
          {/if}
          
     </div>
</main>