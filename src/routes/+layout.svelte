<script>
	import { auth } from '$lib/auth';
	import { db } from '$lib/firebase/db';
	import Footer from '$lib/layout/Footer.svelte';
	import Header from '$lib/layout/Header.svelte';
	import { APP_NAME } from '$lib/meta';
	import { user } from '$lib/user';
	import { SvelteUIProvider } from '@svelteuidev/core';
	import { doc, getDoc, query, where } from 'firebase/firestore';
	import '../app.css';

	$: {
		(async () => {
			if ($auth?.uid) {
				const userRef = doc(db, 'users', $auth.uid);
				const userDoc = await getDoc(userRef);
				if (userDoc.exists()) {
					$user = userDoc.data();
				} else {
					$user = null;
				}
			} else {
				$user = null;
			}
		})();
	}
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
