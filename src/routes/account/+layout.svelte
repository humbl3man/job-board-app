<script lang="ts">
	import { page } from '$app/stores';
	import { Role } from '$lib/constants/Role';
	import { formatName } from '$lib/utils/formatName';

	export let data;

	function getUserName() {
		if (data.user.role === Role.EMPLOYER) {
			return data.user.company;
		}
		if (data.user.firstName && data.user.lastName) {
			return formatName(data.user.firstName, data.user.lastName, true);
		}
		return data.user.email;
	}
</script>

<div class="mx-auto max-w-screen-xl px-2">
	<header class="py-8 md:py-12">
		<h1>Welcome, {getUserName()}</h1>
	</header>
	<div class="account">
		<aside class="py-4 bg-white ring-1 ring-slate-700/5 shadow-sm">
			<ul class="menu menu-compact menu-horizontal md:menu-normal md:menu-vertical md:w-full">
				{#each data.accountLinks as { href, label, aliasHrefs }}
					<li
						class:bordered={$page.route.id === href || aliasHrefs?.includes(String($page.route.id))}
					>
						<a
							class="block w-full"
							{href}>{label}</a
						>
					</li>
				{/each}
			</ul>
		</aside>
		<section class="bg-white p-12 ring-1 ring-slate-700/5 shadow-sm">
			<slot />
		</section>
	</div>
</div>

<style lang="postcss">
	.account {
		@apply grid gap-4 grid-cols-1 md:grid-cols-[minmax(200px,max-content)_1fr];
	}
</style>
