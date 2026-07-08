<script>
     import { goto } from "$app/navigation";
     import Logo from '$lib/assets/favicon/favicon.svg'
</script>


<main class="m-2 p-2 grid justify-self-center md:max-w-md lg:max-w-lg xl:max-w-xl">
     <div class="py-10 rounded-2xl">
          <div class="my-5 mb-55 flex flex-col items-center">
               <div class="flex items-center gap-2">
                    <img src={Logo} alt="logo" class="size-15 lg:size-30">  
                    <h2 class="text-6xl text-center lg:text-8xl">Mangase</h2>
               </div>
               <p class="my-3">Your personal comic café.</p>
          </div>
          <div class="my-10 flex flex-col text-center gap-2 justify-self-center">
               <button class="p-4 rounded bg-neutral-800" onclick={() => goto('/home')}>Browse Manga</button>
               <a href="/login" class="text-neutral-600 underline">Or Log In, here!</a>
          </div>
          
          <div class="text-center">
               <h2>How did you hear about us?</h2>
          </div>
     
     </div>
     
</main>