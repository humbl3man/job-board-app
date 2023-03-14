<script lang="ts">
	import { APP_NAME } from '$lib/meta';
	import { Button, Skeleton, Alert } from '@svelteuidev/core';
	import { CrossCircled } from 'radix-icons-svelte';
</script>

<svelte:head>
	<title>{APP_NAME} | Dashboard</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4">
	<div class="dashboard">
		<aside class="side-nav">
			<a
				class="px-2 py-4 text-center block hover:bg-slate-100"
				href="/dashboard">Profile</a
			>

			<a
				href="/dashboard/created"
				class="px-2 py-4 text-center block hover:bg-slate-100">Job Posts</a
			>
			<button
				type="button"
				class="px-2 py-4 text-center block w-full hover:bg-red-50"
				on:click={() => {
					// TODO:
				}}>Sign Out</button
			>
		</aside>
		<main class="content">
			<slot />
		</main>
	</div>
</div>

<style lang="postcss">
	.dashboard {
		@apply grid min-h-[400px];
		grid-template-columns: minmax(100px, 15%) 1fr;
	}
	.side-nav {
		@apply border-r-2 border-slate-100 bg-white pt-8;
	}
	.content {
		@apply bg-white px-8 py-16;
	}
</style>
