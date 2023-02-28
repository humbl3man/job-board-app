<script lang="ts">
	import { auth } from '$lib/auth';
	import { APP_NAME } from '$lib/meta';
	import { Button } from '@svelteuidev/core';

	let links = [
		{
			href: '/jobs',
			label: 'Jobs'
		},
		{
			href: '/about',
			label: 'About'
		}
	];
</script>

<header class="bg-white border-b border-slate-300">
	<div class="mx-auto max-w-screen-2xl py-4 px-2">
		<div class="flex items-center justify-between">
			<a
				href="/"
				class="uppercase font-bold text-2xl">{APP_NAME}</a
			>
			<nav class="flex">
				{#each links as { href, label }}
					<Button
						{href}
						target=""
						variant="subtle"
						color="indigo"
						class="text-gray-700 mx-2 text-base font-bold">{label}</Button
					>
				{/each}
			</nav>
			<div class="flex items-center">
				{#if $auth}
					<Button
						target=""
						variant="light"
						color="indigo"
						href="/dashboard">Account</Button
					>
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
