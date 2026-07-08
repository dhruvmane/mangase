<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import Advert from "$lib/sections/Advert.svelte";
    import Footer from "$lib/sections/Footer.svelte";
    import Main from "$lib/sections/Main.svelte";
    import Notice from "$lib/sections/Notice.svelte";

</script>

<main class="p-2 md:max-w-md lg:max-w-lg xl:max-w-xl m-auto w-full">
    <Navbar />
    <Notice/>
    <Advert />
    <Main />
    <Footer />
</main>