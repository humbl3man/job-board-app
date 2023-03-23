<script lang="ts">
	import { page } from '$app/stores';
	import { Role } from '$lib/constants/Role';
	import Footer from '$lib/layout/Footer.svelte';
	import Header from '$lib/layout/Header.svelte';
	import { APP_NAME } from '$lib/meta';
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

<div class="grid h-screen page bg-slate-50">
	<Header
		isAdmin={$page.data?.user?.role === Role.ADMIN}
		isEmployer={$page.data?.user?.role === Role.EMPLOYER}
		isAuthenticated={!!$page.data?.user}
	/>
	<main><slot /></main>
	<Footer />
</div>

<style lang="postcss">
	:global(h1, h2, h3, h4) {
		@apply font-bold text-neutral text-2xl sm:text-3xl;
	}
	:global(.btn-ghost) {
		@apply hover:bg-indigo-50 hover:text-indigo-900 focus:bg-indigo-50 focus:text-indigo-900;
	}
	.page {
		grid-template-rows: max-content 1fr max-content;
	}
</style>
