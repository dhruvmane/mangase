<script lang="ts">
	import './layout.css';

	import favicon from '$lib/assets/favicon/favicon.svg';
	import favicon9696 from '$lib/assets/favicon/favicon-96x96.png';
	import faviconico from '$lib/assets/favicon/favicon.ico';
	import appleTouchIcon from '$lib/assets/favicon/apple-touch-icon.png';
	import webManifest from '$lib/assets/favicon/site.webmanifest';


	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href={favicon9696} sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href={favicon} />
	<link rel="shortcut icon" href={faviconico} />
	<link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
	<meta name="apple-mobile-web-app-title" content="Mangase" />
	<link rel="manifest" href={webManifest} />
</svelte:head>
{@render children()}
