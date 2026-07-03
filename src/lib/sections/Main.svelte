<script>
     // Icons
     // Beautify:
     import Star from '$lib/assets/icons/beautify/star.svg'
     import Sparkles from '$lib/assets/icons/beautify/sparkles.svg'
     import Fire from '$lib/assets/icons/beautify/fire.svg'
</script>

<!-- Main Page Section -->
<div class="border-black bg-black rounded-2xl p-2 w-full flex flex-col gap-2">
     <div class="h-full rounded-2xl p-2">
          <h1 class="flex items-center gap-2 text-2xl"><img alt="b" src={Sparkles} class="block invert size-5">Recently Updated</h1>
          <div class="flex gap-x-1 overflow-x-auto whitespace-nowrap my-2 rounded">
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
          </div>
     </div>
     <div class="h-full rounded-2xl p-2">
          <h1 class="flex items-center gap-2 text-2xl"><img alt="b" src={Star} class="block invert size-5">Newly Added</h1>

          <div class="flex gap-x-1 overflow-x-auto whitespace-nowrap my-2 rounded">
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
          </div>
     </div>
     <div class="h-full rounded-2xl p-2">
          <h1 class="flex items-center gap-2 text-2xl"><img alt="b" src={Fire} class="block invert size-5">Most Popular</h1>
          <div class="flex gap-x-1 overflow-x-auto whitespace-nowrap my-2 rounded">
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
               <div class="bg-neutral-50 aspect-3/4 w-[100px] rounded shrink-0"></div>
          </div>
     </div>
</div>