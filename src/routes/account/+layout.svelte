<script lang="ts">
	import { page } from '$app/stores';

	export let data;
</script>

<div class="mx-auto max-w-screen-xl px-2">
	<header class="py-12">
		<h1>Welcome, {data.user.name || data.user.email}</h1>
	</header>
	<div class="account">
		<aside class="flex flex-col min-h-[300px]">
			<nav>
				{#each data.accountLinks as { href, label, aliasHrefs }}
					<a
						{href}
						class="block text-center py-4 px-2 border-b-2 {$page.route.id === href ||
						aliasHrefs?.includes(String($page.route.id))
							? 'border-indigo-500 text-indigo-500'
							: 'border-transparent'}">{label}</a
					>
				{/each}
			</nav>
		</aside>
		<section>
			<slot />
		</section>
	</div>
</div>

<style lang="postcss">
	.account {
		@apply grid gap-12;
		grid-template-columns: 20% 1fr;
	}
</style>
