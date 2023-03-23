<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { User } from '@prisma/client';

	export let isAuthenticated: Boolean;
	export let isEmployer: Boolean;
	export let isAdmin: Boolean;
	export let user: User;

	let defaultLinks = [
		{
			href: '/jobs',
			label: 'Jobs'
		}
	];
</script>

<header class="bg-primary-content">
	<div class="mx-auto max-w-screen-2xl py-4 px-2">
		<div class="flex items-center justify-between">
			<a
				href="/"
				class="font-bold text-xl uppercase text-base-content">Job Finder</a
			>
			<nav class="grid grid-flow-col gap-2">
				{#if isAdmin}
					<a
						href="/admin"
						class="btn btn-ghost btn-sm">Admin</a
					>
				{/if}
				{#each defaultLinks as { href, label }}
					<a
						{href}
						class="btn btn-sm btn-ghost btn-info">{label}</a
					>
				{/each}
				{#if isEmployer}
					<a
						href="/jobs/create"
						class="btn btn-sm btn-ghost">+ Create Job</a
					>
				{/if}
			</nav>
			<div class="grid grid-flow-col gap-2 items-center">
				{#if isAuthenticated}
					<div class="dropdown dropdown-end">
						<label
							tabindex="0"
							class="btn m-1 btn-sm btn-outline btn-primary">{user.name || user.email}</label
						>
						<ul
							tabindex="0"
							class="dropdown-content bg-white border border-slate-200 flex p-2 rounded-box flex-col w-52"
						>
							<li>
								<a
									href="/account"
									class="btn btn-ghost btn-sm w-full">Account</a
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
									<button class="btn btn-ghost btn-sm w-full">Logout</button>
								</li>
							</form>
						</ul>
					</div>
				{/if}

				{#if !isAuthenticated}
					<a
						href="/login"
						class="btn btn-sm btn-primary">Login</a
					>
					<a
						href="/register"
						class="btn btn-sm btn-ghost">Register</a
					>
				{/if}
			</div>
		</div>
	</div>
</header>
