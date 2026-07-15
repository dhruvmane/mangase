<script lang=ts>
     import Navbar from "$lib/components/Navbar.svelte";

     // Icons
     import Filter from "$lib/assets/icons/filter.svg"

     let filterTabOpen = $state(false)
     let hasSearched = $state(true)

</script>

<svelte:head>
     <title>Search — Mangase</title>
</svelte:head>

<main class="p-2 m-2 h-screen flex flex-col gap-2 md:max-w-md lg:max-w-lg xl:max-w-xl xl:m-auto">
     <Navbar state="SEARCH"/>
     <!-- Search Filter -->
     <div class="px-4 py-2 flex flex-col rounded-2xl bg-black">
          <div class="flex items-center">
               <h1 class="px-2 text-[20px]">Filter</h1>
               {#if !filterTabOpen}
                    <button class="p-2 rounded-2xl bg-neutral-950 ml-auto"
                         onclick={() => {filterTabOpen = !filterTabOpen}}
                    ><img alt="filter" src={Filter} class="invert size-6"></button>
               {:else}
                    <button class="p-2 rounded-2xl bg-neutral-900 ml-auto"
                         onclick={() => {filterTabOpen = !filterTabOpen}}
                    ><img alt="filter" src={Filter} class="invert size-6"></button>
               {/if}
          </div>

          {#if filterTabOpen}
               FILTERS 
               <div class="min-h-[100px] p-2 bg-neutral-900 rounded my-2">
                     Sort By
                    <h1>Genre</h1>
                    <h1>Tags</h1>
                    <h1>Status</h1>
                    <h1>Popularity</h1>
                    <h1>Reviews</h1>
               </div>
               APPLY FILTERS 
               <div class="my-2 flex gap-1">
                    <button class="p-2 flex-1 bg-neutral-900 rounded">Apply Filters</button>
                    <button class="p-2 flex-1 bg-neutral-900 rounded">Clear Filters</button>
               </div>
          {/if}
          
     </div>

     <!-- Search Results -->
     {#if hasSearched}
          <div class="p-4 bg-black rounded-2xl">
               <h1 class="text-[12px]">Search Results for</h1>
               <h1 class="text-2xl">Chainsaw Man</h1>

               
               <div class="my-2 w-full mt-5">
                    <div class="h-[90px] rounded bg-neutral-900 my-1"></div>
               </div>
          </div>
     {:else}
          <div class="p-4 bg-black rounded-2xl">
               <h1>Most Searched</h1>
          </div>
     {/if}
     

     <!-- {#if searchQueryResults}
          {#each searchQueryResults as result}
          <div class="p-2 bg-neutral-950 rounded-2xl">
               <h1>{result.attributes.title}</h1>
          </div>
          {/each}
     {/if} -->
</main>