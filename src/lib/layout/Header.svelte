<script lang="ts">
	import { auth } from '$lib/auth';
	import { APP_NAME } from '$lib/meta';
	import { Button } from '@svelteuidev/core';

	let links = [
		{
			href: '/jobs',
			label: 'Jobs'
		}
	];
</script>

<header class="bg-white border-b border-slate-300">
	<div class="mx-auto max-w-screen-2xl py-4">
		<div class="flex items-center justify-between">
			<a
				href="/"
				class="uppercase font-bold text-2xl">{APP_NAME}</a
			>
			<nav>
				{#each links as { href, label }}
					<a
						{href}
						class="text-slate-800 font-bold uppercase">{label}</a
					>
				{/each}
			</nav>
			<div class="flex items-center">
				{#if $auth}
					<a href="/dashboard">{$auth.displayName || $auth.email}</a>
				{:else if $auth === null}
					<Button
						variant="filled"
						color="orange"
						target=""
						href="/login"
						class="mr-4 font-bold">Login</Button
					>
					<Button
						variant="light"
						color="indigo"
						target=""
						href="/login"
						class="mr-4 font-bold">Register</Button
					>
				{/if}
			</div>
		</div>
	</div>
</header>
