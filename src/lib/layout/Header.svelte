<script lang="ts">
	export let isAuthenticated: Boolean;
	export let isEmployer: Boolean;
	export let isAdmin: Boolean;

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
					<a
						class="btn btn-sm btn-primary"
						href="/account">Account</a
					>
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
