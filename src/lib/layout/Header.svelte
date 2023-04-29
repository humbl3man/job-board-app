<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { Role } from '$lib/constants/Role';
	import { formatName } from '$lib/utils/formatName';
	import { ChevronDown } from 'radix-icons-svelte';

	export let user: {
		email: string;
		id: number;
		company?: string | undefined;
		companyId?: number | undefined;
		firstName?: string | null | undefined;
		lastName?: string | null | undefined;
		role: number;
	};
	export let navigation: { href: string; label: string }[];

	$: isAuthenticated = Boolean(user);
</script>

<!-- {@debug $page} -->

<header class="border-b border-slate-200 bg-primary-content">
	<div class="mx-auto max-w-screen-2xl py-4 px-2">
		<div class="flex items-center justify-between">
			<a
				href="/"
				class="text-xl font-bold uppercase text-base-content">Job Finder</a
			>
			<nav class="grid grid-flow-col gap-5">
				{#each navigation as { href, label }}
					<a
						{href}
						class="nav-link {$page.route.id === href ? 'active' : ''}">{@html label}</a
					>
				{/each}
			</nav>
			<div class="grid grid-flow-col items-center gap-2">
				{#if isAuthenticated}
					<div class="dropdown-end dropdown">
						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label
							tabindex="0"
							class="btn-ghost no-animation btn-sm btn m-1 gap-2"
						>
							{#if user.firstName && user.lastName}
								<span>{formatName(user.firstName, user.lastName, true)}</span>
							{:else}
								<span>{user.email}</span>
							{/if}
							<ChevronDown />
						</label>
						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<ul
							tabindex="0"
							class="dropdown-content flex w-52 flex-col rounded-sm bg-white py-1 shadow-md ring-1 ring-slate-700/5"
						>
							<li>
								<a
									href={user.role === Role.EMPLOYER ? '/account/employer' : '/account/user'}
									class="btn-ghost btn-sm btn inline-flex w-full justify-start normal-case"
									>Account</a
								>
							</li>
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
								<li>
									<button class="btn-ghost btn-sm btn inline-flex w-full justify-start normal-case"
										>Logout</button
									>
								</li>
							</form>
						</ul>
					</div>
				{/if}

				{#if !isAuthenticated}
					<a
						href="/login"
						class="btn-primary btn-sm btn">Login</a
					>
					<a
						href="/register"
						class="btn-ghost btn-sm btn">Register</a
					>
				{/if}
			</div>
		</div>
	</div>
</header>

<style lang="postcss">
	.nav-link {
		@apply border-b-2 border-b-transparent text-slate-700 hover:border-b-indigo-800 hover:text-indigo-800;
	}
	.nav-link.active {
		@apply border-b-indigo-800 text-indigo-800;
	}
</style>
