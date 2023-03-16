<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { APP_NAME } from '$lib/meta';
	import { Button } from '@svelteuidev/core';

	export let isAuthenticated: Boolean;

	let defaultLinks = [
		{
			href: '/jobs',
			label: 'Jobs'
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
				{#each defaultLinks as { href, label }}
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
				{#if isAuthenticated}
					<a
						class="button button--sm mr-4 font-bold"
						href="/dashboard">Account</a
					>
					<form
						method="POST"
						action="/logout"
						use:enhance={() => {
							return async ({ result }) => {
								await invalidateAll();
								await applyAction(result);
							};
						}}
					>
						<button class="logoutBtn button button--sm font-bold">Logout</button>
					</form>
				{/if}

				{#if !isAuthenticated}
					<a
						href="/login"
						class="button button--sm mr-4 font-bold">Login</a
					>
					<a
						href="/register"
						class="button button--sm mr-4 font-bold">Register</a
					>
				{/if}
			</div>
		</div>
	</div>
</header>

<style lang="postcss">
	.logoutBtn {
		@apply border border-indigo-800 text-indigo-700 bg-transparent hover:bg-transparent;
	}
</style>
