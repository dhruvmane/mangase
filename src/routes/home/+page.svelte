<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import Advert from "$lib/sections/Advert.svelte";
    import Main from "$lib/sections/Main.svelte";
    import Notice from "$lib/sections/Notice.svelte";

    import { page } from "$app/state";


</script>

<svelte:head>
     <title>Home — Mangase</title>
</svelte:head>

<main class="p-2 m-2 md:max-w-md lg:max-w-lg lg:m-auto flex">
    <div>
        <Navbar />
        <Notice/>
        <Advert />
        <Main data={page.data} />
    </div>
    <div>
    </div>
</main>