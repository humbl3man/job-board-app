<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/auth';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!$auth) {
			goto('/login');
		}
	});
</script>

<h1>Dashboard</h1>
{#if $auth}
	<p>Welcome, {$auth.displayName || $auth.email}</p>
	<button on:click={auth.logout}>Log Out</button>
{/if}
