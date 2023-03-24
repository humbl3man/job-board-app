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

<div class="grid page h-full bg-slate-50">
	<Header
		isAdmin={$page.data?.user?.role === Role.ADMIN}
		isEmployer={$page.data?.user?.role === Role.EMPLOYER}
		isAuthenticated={!!$page.data?.user}
		user={$page.data?.user}
	/>
	<main><slot /></main>
	<Footer />
</div>

<style lang="postcss">
	:global(html) {
		@apply bg-slate-300;
	}
	:global(h1, h2, h3, h4) {
		@apply font-bold text-neutral text-2xl sm:text-3xl;
	}
	:global(.btn) {
		@apply rounded-sm;
	}
	:global(.input),
	:global(.select),
	:global(.textarea) {
		@apply rounded-sm;
	}
	:global(.btn-ghost) {
		@apply hover:bg-indigo-50 hover:text-indigo-900 focus:bg-indigo-50 focus:text-indigo-900;
	}

	:global(.input[data-invalid]) {
		@apply input-error;
	}
	:global(.select[data-invalid]) {
		@apply select-error;
	}
	:global(.textarea[data-invalid]) {
		@apply textarea-error;
	}
	:global(.select) {
		@apply text-base font-normal;
	}
	:global(.textarea) {
		@apply text-base leading-relaxed;
	}
	:global(.custom-wrapper) {
		@apply my-8 mb-16 mx-auto px-7 py-12 bg-white rounded-sm border-b-[3px] border-slate-200;
	}
	.page {
		grid-template-rows: max-content 1fr max-content;
	}
</style>
