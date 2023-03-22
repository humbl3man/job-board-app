<script lang="ts">
	import { enhance } from '$app/forms';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import ValidationError from '$lib/components/ValidationError.svelte';
	import { Role } from '$lib/constants/Role';
	import { ExclamationTriangle } from 'radix-icons-svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let company = data.user.company;
	let name = data.user.name || '';
</script>

<!-- <pre>
	{JSON.stringify(form, null, 2)}
</pre> -->

<section class="dashboard mx-auto max-w-3xl bg-white mt-16">
	<div class="p-6 border-b border-slate-300">
		<h1 class="text-2xl mb-2">Account Information - Update</h1>
		{#if form?.company_exists}
			<ErrorMessage>Failed to update company name. Name is already taken.</ErrorMessage>
		{/if}
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
		{#if data.user.role === Role.USER}
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
							<ValidationError>
								{form.fieldErrors?.name[0]}
							</ValidationError>
						{/if}
					</div>
				</div>
			</div>
		{/if}
		{#if data.user.role === Role.EMPLOYER}
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
						{#if form?.fieldErrors?.companyName}
							<ValidationError>
								{form.fieldErrors?.companyName[0]}
							</ValidationError>
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
