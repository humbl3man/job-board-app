<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if $page.status === 404}
	<h1>Page Not Found</h1>
	<a
		href="/"
		class="link">Navigate Home</a
	>
{/if}
