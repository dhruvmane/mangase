<script>
     // Icons
     import Search from '$lib/assets/icons/search.svg'
     import Profile from '$lib/assets/icons/profile.svg'
     import Options from '$lib/assets/icons/options.svg'

</script>

<main class="flex bg-black rounded-2xl items-center h-[50px] mb-2 border-neutral-500 p-2">
     <div>
          <!-- Mangase Button -->
          <button class="bg-neutral-900 p-1 size-9 text-[15px] rounded-2xl">
               M
          </button>
          
     </div>
     
     <div class="ml-auto">
          
          <!-- Search Button -->
          <button class="bg-neutral-900 p-2 rounded-2xl">
               <img alt="search" src={Search} class="invert size-5">
          </button>
          
          <!-- Profile -->
          <button class="bg-neutral-900 p-2 rounded-2xl">
               <img alt="search" src={Profile} class="invert size-5">
          </button>
     
          <!-- Options -->
          <button class="bg-neutral-900 p-2 rounded-2xl">
               <img alt="search" src={Options} class="invert size-5">
          </button>

     </div>
</main>