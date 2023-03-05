<script>
	import Footer from '$lib/layout/Footer.svelte';
	import Header from '$lib/layout/Header.svelte';
	import { APP_NAME } from '$lib/meta';
	import { SvelteUIProvider } from '@svelteuidev/core';
	import '../app.css';
</script>

<svelte:head>
	<title>{APP_NAME}</title>
	<link
		rel="preconnect"
		href="https://fonts.googleapis.com"
	/>
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin="anonymous"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=Merriweather:wght@700;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<SvelteUIProvider>
	<div class="grid h-screen root">
		<Header />
		<main><slot /></main>
		<Footer />
	</div>
</SvelteUIProvider>

<style lang="postcss">
	:global(html) {
		@apply bg-slate-100;
	}
	:global(a.link) {
		@apply text-blue-500 inline-block underline focus:text-blue-700 hover:text-blue-700;
	}
	:global(h1, h2, h3, h4) {
		@apply font-bold;
	}

	.root {
		grid-template-rows: max-content 1fr max-content;
	}
</style>
