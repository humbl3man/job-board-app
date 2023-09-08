<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import Footer from '$lib/layout/Footer.svelte';
	import Header from '$lib/layout/Header.svelte';
	import { APP_NAME } from '$lib/meta';
	import '../app.css';

	export let data;

	onNavigate((navigation) => {
		return new Promise((resolve) => {
			document;
			if (!document.startViewTransition) return resolve();

			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
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

<div class="page">
	<Header
		user={data.user}
		navigation={data.navigation}
	/>
	<main class="bg-slate-50/60"><slot /></main>
	<Footer />
</div>

<style lang="postcss">
	:global(h1, h2, h3, h4) {
		@apply text-2xl font-bold text-neutral sm:text-3xl;
	}
	:global(.btn) {
		@apply no-animation rounded-sm;
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
		@apply mx-auto my-8 mb-16 rounded-sm border-b-[3px] border-slate-500/25 bg-white px-7 py-12 ring-1 ring-slate-200/70;
	}
	.page {
		@apply grid h-screen;
		grid-template-rows: max-content 1fr max-content;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-right {
		from {
			transform: translateX(30px);
		}
	}

	@keyframes slide-to-left {
		to {
			transform: translateX(-30px);
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		:root::view-transition-old(root) {
			animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
				300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
		}

		:root::view-transition-new(root) {
			animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
				300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
		}
	}
</style>
