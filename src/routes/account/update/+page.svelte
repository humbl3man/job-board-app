<script lang="ts">
	import { enhance } from '$app/forms';
	import Shell from '$lib/components/Shell.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let company = data.user.company;
	let name = data.user.name || '';
</script>

<pre>
	{JSON.stringify(form, null, 2)}
</pre>

<Shell>
	<section class="dashboard mx-auto max-w-3xl bg-white mt-16">
		<div class="p-6 border-b border-slate-300">
			<h1 class="text-2xl mb-2">Account Information - Update</h1>
		</div>
		<form
			method="POST"
			action="?/updateaccount"
			use:enhance
		>
			<div class="row">
				<div class="col-left">Email Address</div>
				<div class="col-right">
					{data.user.email}
				</div>
			</div>
			{#if !company}
				<div class="row">
					<div class="col-left">Name</div>
					<div class="col-right">
						<div class="relative pb-5">
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
							{#if form?.fieldErrors?.name}
								<div
									class="bg-red-50 text-red-900 py-1 px-3 text-sm absolute left-0 leading-none -bottom-[2px]"
								>
									{form.fieldErrors?.name[0]}
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/if}
			{#if company}
				<div class="row">
					<div class="col-left">Company Name</div>
					<div class="col-right">
						<div class="relative pb-5">
							<label
								for="name"
								class="sr-only">Company Name</label
							>
							<input
								type="text"
								class="input w-full"
								id="name"
								name="company"
								bind:value={company}
							/>
							{#if form?.fieldErrors?.company}
								<div
									class="bg-red-50 text-red-900 py-1 px-3 text-sm absolute left-0 leading-none -bottom-[2px]"
								>
									{form.fieldErrors?.company[0]}
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/if}
			<div class="row">
				<div class="col-left" />
				<div class="col-right flex justify-end">
					<button class="button mr-2">Save Changes</button>
					<a
						href="/account"
						class="button-ghost">Cancel</a
					>
				</div>
			</div>
		</form>
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
