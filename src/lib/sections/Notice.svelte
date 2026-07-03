<script lang=ts>

     import { AppInstance } from '$lib/modules/globals.svelte'
     import { hideNotice } from '$lib/modules/functions/notice.svelte';

     let noticePath = AppInstance._NOTICE?.fileName

     import { marked } from "marked";
     import DOMPurify from "dompurify";
     import { onMount } from "svelte";

     // Icons
     import Cross from '$lib/assets/icons/trash.svg'

     // Get list of ALL markdown files
     const notices = import.meta.glob('/src/lib/text/*.md', {
          query: '?raw',
          import: 'default',
          eager: true
     })
     // Choose the one desired to be shown as notice.
     const notice = notices[`/src/lib/text/${noticePath}.md`] ?? '';

     let { author = "the Mangase Team" } = $props();

     let rawHTML;
     let parsedHTML: string | Node = $state("");
     onMount(async () => {
          rawHTML = marked.parse(notice).toString()
          parsedHTML = DOMPurify.sanitize(rawHTML);
     })

</script>

{#if AppInstance._NOTICE?.showNotice}
<div class="px-3 py-1 my-2 rounded-2xl border-2 border-neutral-700">
     <!-- Notice Heading -->
     <div class="flex items-center">
          <h2 class="flex flex-col text-center gap-2 text-[15px] opacity-30">NOTICE</h2>
          <button class="ml-auto p-2 rounded-2xl" onclick={() => {hideNotice()}}>
               <img src={Cross} alt="cross" class="invert size-5">
          </button>
     </div>
     
     
     <!-- Notice -->
     <article class="py-3 rounded-2xl prose-neutral dark:prose-invert">
          <div class="prose-h1:uppercase rounded-2xl prose-p:mt-3 prose-a:hover:underline">
               {@html parsedHTML}
          </div>
     </article>
     
     <!-- Notice Footing -->
     <div class="flex items-center gap-2 opacity-30">
          <h2 class="text-[15px]">10th June, 2026</h2>
          <h2 class="ml-auto">{author}</h2>
     </div>
</div>
{/if}