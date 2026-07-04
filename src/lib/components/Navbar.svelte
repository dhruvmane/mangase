<script>
     // Icons
     import Search from '$lib/assets/icons/search.svg'
     import Profile from '$lib/assets/icons/profile.svg'
     import Settings from '$lib/assets/icons/options.svg'
     import Down from '$lib/assets/icons/down.svg'

     import { goto } from '$app/navigation';

     let { state = "MAIN" } = $props()
     let searchBarState = $derived(state)

</script>

<main class="flex bg-black rounded-2xl items-center h-[50px] mb-2 border-neutral-500 p-2">
     <div>
          <!-- Mangase Button -->
          <button class="bg-neutral-900 p-1 size-9 text-[15px] rounded-2xl" onclick={() => {goto("/home")}}>
               M
          </button>
          
     </div>
     
     {#if searchBarState === "SEARCH"}
     <div class="p-2 text-white">
          <input type="text" class="w-full h-[20%] bg-neutral-950 rounded-2xl border-0 focus:ring-0 px-5">
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
               <img alt="search" src={Profile} class="invert size-5">
          </button>
          
          <!-- Settings -->
          <button class="bg-neutral-900 p-2 rounded-2xl" onclick={() => {goto("/settings")}}>
               <img alt="search" src={Settings} class="invert size-5">
          </button>
          {/if}

          {#if searchBarState === "SEARCH"}
               <!-- Settings -->
               <button class="bg-neutral-900 p-2 rounded-2xl" onclick={() => {searchBarState = "MAIN"}}>
                    <img alt="search" src={Down} class="invert size-5">
               </button>
          {/if}
          
          
          
     </div>
</main>