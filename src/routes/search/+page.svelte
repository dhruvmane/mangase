<script lang=ts>
     import Navbar from "$lib/components/Navbar.svelte";

     // Icons
     import Filter from "$lib/assets/icons/filter.svg"
     import { AppInstance } from "$lib/modules/globals.svelte";
     import { goto } from "$app/navigation";
     import { convertToProxyLink, getMangaCoverArt, getTitle } from "$lib/modules/functions/manga.svelte";

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

<main class="m-2 p-2 md:max-w-md lg:max-w-lg xl:max-w-xl xl:m-auto h-screen">
     <Navbar state="SEARCH"/>


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
                                   <img src={convertToProxyLink(result.coverString)} loading="lazy" alt="coverart" class="w-full object-cover">
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
               <h1>Search for Manga</h1>
          </div>
     {/if}
</main>