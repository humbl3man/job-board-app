<script lang="ts">
	import { page } from '$app/stores';
	import { Role } from '$lib/constants/Role';
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
	<div class="grid h-screen page">
		<Header
			isAdmin={$page.data?.user?.role === Role.ADMIN}
			isEmployer={$page.data?.user?.role === Role.EMPLOYER}
			isAuthenticated={!!$page.data?.user}
		/>
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
		@apply font-bold text-slate-900 text-2xl sm:text-3xl;
	}
	:global(.label) {
		@apply leading-7 text-slate-800;
	}
	:global(.input) {
		@apply bg-slate-100 bg-opacity-50 rounded border border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-slate-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out;
	}

	:global(.button) {
		@apply leading-tight px-4 py-2 text-base rounded-md border-0 text-indigo-50 bg-indigo-700 hover:bg-indigo-800 hover:text-white font-bold transition duration-100;
	}
	:global(.button-ghost) {
		@apply leading-tight px-4 py-2 text-base rounded-md border-0 hover:bg-indigo-50 text-indigo-900 font-bold transition duration-100;
	}
	:global(.input.error) {
		@apply text-red-600 border-red-500 focus:border-red-700;
	}

	.page {
		grid-template-rows: max-content 1fr max-content;
	}
</style>
