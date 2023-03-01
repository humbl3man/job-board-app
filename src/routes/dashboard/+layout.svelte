<script lang="ts">
	import { auth } from '$lib/auth';
	import { APP_NAME } from '$lib/meta';
	import { Button, Skeleton, Alert } from '@svelteuidev/core';
	import { CrossCircled } from 'radix-icons-svelte';

	$: loading = $auth === undefined;
</script>

<svelte:head>
	<title>{APP_NAME} | Dashboard</title>
</svelte:head>

{#if $auth !== null}
	<div class="mx-auto max-w-7xl px-4">
		<div class="dashboard">
			<aside class="side-nav">
				<Skeleton visible={loading}>
					<Button
						href="/dashboard"
						target=""
						variant="subtle"
						color="indigo"
						class="w-full rounded-none"
						size="md">Dashboard</Button
					>

					<Button
						variant="subtle"
						color="pink"
						size="md"
						class="w-full rounded-none"
						on:click={auth.logout}>Sign Out</Button
					>
				</Skeleton>
			</aside>
			<main class="content">
				<Skeleton
					visible={loading}
					height={50}
				>
					<slot />
				</Skeleton>
			</main>
		</div>
	</div>
{:else}
	<div class="mx-auto max-w-md mt-20">
		<Alert
			title="Access Denied"
			variant="outline"
			radius="sm"
			color="pink"
			icon={CrossCircled}
		>
			You need to be logged in to view this page.<br />
		</Alert>
		<Button
			class="mt-4"
			color="pink"
			variant="filled"
			radius="sm"
			href="/login">Login</Button
		>
	</div>
{/if}

<style lang="postcss">
	.dashboard {
		@apply grid min-h-[400px];
		grid-template-columns: max-content 1fr;
	}
	.side-nav {
		@apply border-r bg-white pt-8;
	}
	.content {
		@apply bg-white px-8 py-16;
	}
</style>
