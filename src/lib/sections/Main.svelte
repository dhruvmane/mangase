<script>
     // import { AppInstance } from '$lib/modules/globals.svelte';
     import { page } from '$app/state';
     let { data } = $props()

     // Icons
     import ArrowLeft from "$lib/assets/icons/left-arrow.svg"
     import ArrowRight from "$lib/assets/icons/arrow-right.svg"
     // Beautify:
     import Star from '$lib/assets/icons/beautify/star.svg'
     import Sparkles from '$lib/assets/icons/beautify/sparkles.svg'
     import Fire from '$lib/assets/icons/beautify/fire.svg'

     import { goto } from '$app/navigation';

</script>

<!-- Main Page Section -->
<div class="border-black rounded-mangase-rounded p-2 flex flex-col gap-2 md:max-w-md lg:max-w-lg xl:max-w-xl justify-self-center w-full">
     <h1 class="text-center my-auto">Our website is heavily Work in Progress. Please use the search button to start reading manga!</h1>
</div>