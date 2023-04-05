<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import ValidationError from '$lib/components/ValidationError.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form: updateForm, errors } = superForm(data.form);
</script>

<section class="dashboard">
	<div class="mb-6 border-b border-slate-300 py-6">
		<h1 class="mb-2 text-2xl">Company - Update</h1>
	</div>
	<form
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				await invalidateAll();
				await applyAction(result);
			};
		}}
	>
		<div class="row">
			<div class="col-left">Email Address</div>
			<div class="col-right">
				{data.user.email}
			</div>
		</div>
		<div class="row">
			<div class="col-left">Company Name</div>
			<div class="col-right">
				<div class="form-control">
					<label
						for="companyName"
						class="sr-only">Company Name</label
					>
					<input
						type="text"
						class="input-primary input w-full {$errors?.companyName ? 'input-error' : ''}"
						id="companyName"
						name="companyName"
						bind:value={$updateForm.companyName}
					/>
					{#if $errors?.companyName}
						<ValidationError label="companyName">
							{$errors.companyName[0]}
						</ValidationError>
					{/if}
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-left">Company Description</div>
			<div class="col-right">
				<div class="form-control">
					<label
						for="companyDescription"
						class="sr-only">Company Description</label
					>
					<textarea
						class="textarea-primary textarea w-full {$errors?.companyDescription
							? 'textarea-error'
							: ''}"
						id="companyDescription"
						name="companyDescription"
						rows={5}
						bind:value={$updateForm.companyDescription}
					/>
					{#if $errors?.companyDescription}
						<ValidationError label="companyDescription">
							{$errors.companyDescription[0]}
						</ValidationError>
					{/if}
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-left" />
			<div class="col-right flex justify-end">
				<button class="btn-primary btn mr-2">Save Changes</button>
				<a
					href="/account/employer"
					class="btn-ghost btn">Cancel</a
				>
			</div>
		</div>
	</form>
</section>

<style lang="postcss">
	.dashboard .row {
		@apply grid items-center gap-4 border-b border-slate-300 py-6 last-of-type:border-0 sm:grid-cols-[200px_1fr] sm:gap-8;
	}
	.dashboard .col-left {
		@apply text-slate-500;
	}
	.dashboard .col-right {
		@apply text-slate-900;
	}
</style>
