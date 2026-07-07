<script>
     import Navbar from "$lib/components/Navbar.svelte";
     import { AppInstance } from "$lib/modules/globals.svelte";

     let searchQueryResults = AppInstance._USER_CONFIG?._SEARCH

</script>

<main class="m-2 p-2 md:max-w-md lg:max-w-lg xl:max-w-xl justify-self-center w-full">
     <Navbar state="SEARCH"/>
     {#if searchQueryResults}
          {#each searchQueryResults as result}
          <div class="p-2 bg-neutral-950 rounded-2xl">
               <h1>{result.attributes.title}</h1>
          </div>
          {/each}
     {/if}
</main>