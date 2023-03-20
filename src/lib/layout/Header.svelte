<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { APP_NAME } from '$lib/meta';

	export let isAuthenticated: Boolean;
	export let isEmployer: Boolean;

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
			<nav class="grid grid-flow-col gap-2">
				{#each defaultLinks as { href, label }}
					<a
						{href}
						class="button-ghost">{label}</a
					>
				{/each}
				{#if isEmployer}
					<a
						href="/jobs/create"
						class="button-ghost">+ Create Job</a
					>
				{/if}
			</nav>
			<div class="grid grid-flow-col gap-4 items-center">
				{#if isAuthenticated}
					<a
						class="button-ghost"
						href="/account">Account</a
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
						<button class="button-ghost">Logout</button>
					</form>
				{/if}

				{#if !isAuthenticated}
					<a
						href="/login"
						class="button-ghost">Login</a
					>
					<a
						href="/register"
						class="button-ghost">Register</a
					>
				{/if}
			</div>
		</div>
	</div>
</header>
