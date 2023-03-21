<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Shell from '$lib/components/Shell.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<!-- <pre>
	{JSON.stringify(data, null, 2)}
</pre> -->

<Shell>
	<section class="dashboard mx-auto max-w-3xl bg-white mt-16">
		<div class="p-6 border-b border-slate-300">
			<h1 class="text-2xl mb-2">Account Information</h1>
			<div class="text-slate-600 flex items-center justify-between">
				<span
					>Hello, <strong>{data?.user?.name || data?.user?.company || data?.user?.email}</strong
					></span
				>
				<form
					action="/logout"
					method="POST"
					class="inline-block"
					use:enhance={() => {
						return async ({ result }) => {
							await invalidateAll();
							await applyAction(result);
						};
					}}
				>
					<button class="button-ghost">Logout</button>
				</form>
			</div>
		</div>
		<div class="row">
			<div class="col-left">Email Address</div>
			<div class="col-right">
				{data.user.email}
			</div>
		</div>
		{#if !data.user.companyId && data.user.name}
			<div class="row">
				<div class="col-left">Name</div>
				<div class="col-right">
					{data.user.name}
				</div>
			</div>
		{/if}
		{#if data.user.company}
			<div class="row">
				<div class="col-left">Company Name</div>
				<div class="col-right">
					{data.user.company}
				</div>
			</div>
		{/if}
		<div class="row">
			<div class="col-left" />
			<div class="col-right flex justify-end">
				<a
					href="/account/update"
					class="button">Update</a
				>
			</div>
		</div>
	</section>
</Shell>

<style lang="postcss">
	.dashboard .row {
		@apply p-6 border-b border-slate-300 grid gap-4 sm:gap-8 items-center sm:grid-cols-[200px_1fr];
	}
	.dashboard .col-left {
		@apply text-slate-500;
	}
	.dashboard .col-right {
		@apply text-slate-900;
	}
</style>
