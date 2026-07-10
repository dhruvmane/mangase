<!-- USER PAGE -->

<script>
     import Navbar from '$lib/components/Navbar.svelte';
     import { userPageConfig, switchDisplay } from '$lib/modules/globals/userPage.svelte.js';

     import { page } from '$app/state';

     // Icons
     import User from '$lib/assets/icons/profile.svg'
     let { data } = $props()  
     
</script>


<main class="m-2 p-2 md:max-w-md lg:max-w-lg xl:max-w-xl xl:m-auto">
     <Navbar />
     <div class="flex flex-col gap-1 md:max-w-md lg:max-w-lg xl:max-w-xl m-auto w-full">
     <!-- Profile -->
     <div class="flex items-center gap-5 p-4 rounded-2xl bg-black ">
          {#if page.data.user.profilePicURL}
               <img alt="user" src={page.data.user.profilePicURL} class="rounded-full size-20">
          {:else}
               <img alt="user" src={User} class="inverted size-10">
          {/if}
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

          </div>
     </div>
     </div>
</main>