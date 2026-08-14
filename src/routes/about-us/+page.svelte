<script lang="ts">
     import { marked } from "marked";
     import DOMPurify from "dompurify";
     import { onMount } from "svelte";
     import Navbar from "$lib/components/Navbar.svelte";
     
     // ABOUT-US.md
     let aboutUs = "_ABOUT-US"

     // Get list of ALL markdown files
     const text = import.meta.glob('/src/lib/text/*.md', {
          query: '?raw',
          import: 'default',
          eager: true
     })
     // Choose the one desired to be shown as notice.
     const notice = text[`/src/lib/text/${aboutUs}.md`] ?? '';


     let rawHTML;
     let parsedHTML: string | Node = $state("");
     onMount(async () => {
          rawHTML = marked.parse(notice).toString()
          parsedHTML = DOMPurify.sanitize(rawHTML);
     })

</script>

<main class="m-2 p-2">
     <Navbar />
     <article class="p-2 rounded-mangase-rounded prose-p:mt-3 prose-a:underline prose-h2:text-5xl prose-h2:my-10">
          {@html parsedHTML}
     </article>
</main>