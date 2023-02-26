<script lang="ts">
	import { auth } from '$lib/auth';
</script>

{#if $auth}
	<h1 class="text-3xl">Welcome, {$auth.displayName || $auth.email}</h1>
{/if}
