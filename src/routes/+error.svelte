<script lang="ts">
	import { page } from '$app/stores';
	// import NotFoundIllustration from '$lib/assets/NotFoundIllustration.svelte';
</script>

<div class="my-24 mx-auto text-center max-w-sm">
	{#if $page.status === 404}
		<h1>Error 404: Page not found</h1>
		<img
			class="w-full block mx-auto"
			src="/404.svg"
			width="225"
			height="150"
			alt="Not Found"
		/>
	{/if}

	{#if $page.status === 500}
		<h1 class="mb-4">500 Internal Server Error</h1>
		<p>
			Sorry, something went wrong on our end. We're working to fix the issue and apologize for the
			inconvenience.
		</p>
	{/if}
</div>
