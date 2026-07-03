<script>
     import { goto } from "$app/navigation";
</script>


<main class="absolute top-1/4 justify-self-center">
     <div class="">
          <h1 class="my-5 italic text-6xl">Mangase</h1>
          <p class="text-2xl">your all-in-one website to read manga, with the community.</p>

          <div class="my-10 justify-self-center">
               <button class="p-2 rounded bg-neutral-800" onclick={() => goto('/home')}>Get Started</button>
          </div>
     </div>
</main>