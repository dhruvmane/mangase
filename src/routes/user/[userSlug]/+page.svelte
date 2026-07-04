<!-- USER PAGE -->

<script>
     import Navbar from '$lib/components/Navbar.svelte';
     import { userPageConfig, switchDisplay } from '$lib/modules/globals/userPage.svelte.js';

     // Icons
     import User from '$lib/assets/icons/profile.svg'
     let { data } = $props()
     
</script>


<main class="m-2 p-2  md:max-w-md lg:max-w-lg xl:max-w-xl justify-self-center w-full">
     <Navbar />
     <div class="flex flex-col gap-1 md:max-w-md lg:max-w-lg xl:max-w-xl justify-self-center w-full">
     <!-- Profile -->
     <div class="flex items-center gap-2 p-4 rounded-2xl bg-black ">
          <img alt="user" src={User} class="invert size-10">
          <div>
               <h1>{data.userSlug}</h1>
          </div>
     </div>

     <!-- Your Manga List -->
     <div class="text-center items-center gap-2 px-4 py-3 rounded-2xl bg-black">
          <div class="grid grid-cols-3">
               {#if userPageConfig._TOGGLED_DISPLAY === "MANGA_LIST"}
                    <button class="text-[12px] border-b py-2" >Your Manga List</button>
               {:else}
                    <button class="text-[12px] py-2" onclick={() => {switchDisplay("MANGA_LIST")}}>Your Manga List</button>
               {/if}
                         {#if userPageConfig._TOGGLED_DISPLAY === "REVIEWS"}
                    <button class="text-[12px] border-b py-2">Your Reviews</button>
               {:else}
                    <button class="text-[12px] py-2" onclick={() => {switchDisplay("REVIEWS")}}>Your Reviews</button>
               {/if}
                         {#if userPageConfig._TOGGLED_DISPLAY === "COMMENTS"}
                    <button class="text-[12px] border-b py-2">Your Comments</button>
               {:else}
                    <button class="text-[12px] py-2" onclick={() => {switchDisplay("COMMENTS")}}>Your Comments</button>
               {/if}
          </div>
          
          <div class="flex flex-col gap-1">
               {#if userPageConfig._TOGGLED_DISPLAY === "MANGA_LIST"}
                    
               {/if}
          </div>
     </div>
     </div>
</main>