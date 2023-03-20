<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Shell from '$lib/components/Shell.svelte';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;

	let email = data.user.email;
	let company = data.user.company;
	let name = data.user.name ?? '';
</script>

<pre>
	{JSON.stringify(data, null, 2)}
</pre>

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
				{email}
			</div>
		</div>
		{#if !data.user.companyId}
			<div class="row">
				<div class="col-left">Name</div>
				<div class="col-right">
					<div class="input-group">
						<form
							method="POST"
							action="?/changename"
							use:enhance={() => {
								return async ({ result }) => {
									await invalidateAll();
									await applyAction(result);
								};
							}}
						>
							<label
								for="name"
								class="sr-only">Name</label
							>
							<input
								type="text"
								class="input w-full"
								id="name"
								name="name"
								bind:value={name}
							/>
							<button
								class="button button--sm"
								disabled={!name}>Update</button
							>
						</form>
						{#if form?.updated}
							<div class="inline-msg text-xs text-green-600">Updated!</div>
						{/if}
						{#if form?.required}
							<div class="inline-msg text-xs text-red-600">Missing</div>
						{/if}
					</div>
				</div>
			</div>
		{/if}
		{#if company}
			<div class="row">
				<div class="col-left">Company Name</div>
				<div class="col-right">
					{company}
				</div>
			</div>
		{/if}
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
	.dashboard .input-group {
		@apply relative;
	}
	.dashboard .input-group .input {
		@apply focus:pr-12;
	}
	.dashboard .input-group .button {
		@apply absolute py-1;
		top: 50%;
		right: 5px;
		transform: translateY(-50%);
	}

	.dashboard .input-group .inline-msg {
		position: absolute;
		bottom: -50%;
		left: 0;
	}
</style>
