<script lang=ts>
     import Navbar from "$lib/components/Navbar.svelte";

     // Icons
     import Filter from "$lib/assets/icons/filter.svg"
     import { AppInstance } from "$lib/modules/globals.svelte";
     import { goto } from "$app/navigation";
     import { getMangaCoverArt, getTitle } from "$lib/modules/functions/manga.svelte";

     let filterTabOpen = $state(false)
     let hasSearched = $state(false)
     let searchResults = $derived(AppInstance._USER_CONFIG?._SEARCH)
     let searchQuery = $derived(AppInstance._USER_CONFIG?._SEARCH_QUERY)

     $effect(() => {
          if (searchQuery) {
               hasSearched = true
          }
     })


</script>

<svelte:head>
     {#if searchQuery !== ""}
          <title>{searchQuery} — Mangase</title>
     {:else}     
          <title>Search — Mangase</title>
     {/if}
</svelte:head>

<main class="p-2 m-2 h-screen flex flex-col gap-2 md:max-w-md lg:max-w-lg xl:max-w-xl xl:m-auto">
     <Navbar state="SEARCH"/>
     <!-- Search Filter -->
     <div class="px-4 py-2 flex flex-col rounded-mangase-rounded bg-black">
          <div class="flex items-center">
               <h1 class="px-2 text-[20px]">Filter</h1>
               {#if !filterTabOpen}
                    <button class="p-2 rounded-mangase-rounded bg-neutral-950 ml-auto"
                         onclick={() => {filterTabOpen = !filterTabOpen}}
                    ><img alt="filter" src={Filter} class="invert size-6"></button>
               {:else}
                    <button class="p-2 rounded-mangase-rounded bg-neutral-900 ml-auto"
                         onclick={() => {filterTabOpen = !filterTabOpen}}
                    ><img alt="filter" src={Filter} class="invert size-6"></button>
               {/if}
          </div>

          {#if filterTabOpen}
               <!-- FILTERS  -->
               <div class="min-h-[100px] p-2 bg-neutral-900 rounded my-2">
                     Sort By
                    <h1>Genre</h1>
                    <h1>Tags</h1>
                    <h1>Status</h1>
                    <h1>Popularity</h1>
                    <h1>Reviews</h1>
               </div>
               <!-- APPLY FILTERS  -->
               <div class="my-2 flex gap-1">
                    <button class="p-2 flex-1 bg-neutral-900 rounded">Apply Filters</button>
                    <button class="p-2 flex-1 bg-neutral-900 rounded">Clear Filters</button>
               </div>
          {/if}
          
     </div>

     <!-- Search Results -->
     {#if hasSearched}
          <div class="p-4 bg-black rounded-mangase-rounded">
               <h1 class="text-[12px]">Search Results for</h1>
               <h1 class="text-2xl">{searchQuery}</h1>

               
               <div class="my-2 w-full mt-5">
               </div>
               
               <div class="w-full mt-5 flex flex-col">
                    {#each searchResults as result}
                         <button class="w-full p-1 text-left rounded grid grid-cols-[30%_60%_10%] gap-2 bg-neutral-900 my-1" onclick={() => {goto(`/manga/${result.id}`)}}>
                              
                              <!-- Cover Art -->
                              <div class="shrink-0 items-start">
                                   <img src={result.coverString} alt="coverart" class="w-full object-cover">
                              </div>

                              <!-- Title -->
                              <div class="p-2 overflow-hidden">
                                   <h1 class="h-[100px] overflow-hidden">{getTitle(result.attributes.title)}</h1>
                              </div>

                         </button>
                    {/each}
               </div>
          </div>
     {:else}
          <div class="p-4 bg-black rounded-mangase-rounded">
               <h1>Most Searched</h1>
          </div>
     {/if}
</main>