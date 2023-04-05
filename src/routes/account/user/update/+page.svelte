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
		<h1 class="mb-2 text-2xl">Profile - Update</h1>
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
			<div class="col-left">First Name</div>
			<div class="col-right">
				<div class="form-control">
					<label
						for="firstName"
						class="sr-only">First Name</label
					>
					<input
						type="text"
						class="input-primary input w-full {$errors?.firstName ? 'input-error' : ''}"
						id="firstName"
						name="firstName"
						bind:value={$updateForm.firstName}
					/>
					{#if $errors?.firstName}
						<ValidationError label="firstName">
							{$errors.firstName[0]}
						</ValidationError>
					{/if}
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-left">Last Name</div>
			<div class="col-right">
				<div class="form-control">
					<label
						for="lastName"
						class="sr-only">Last Name</label
					>
					<input
						type="text"
						class="input-primary input w-full {$errors?.lastName ? 'input-error' : ''}"
						id="lastName"
						name="lastName"
						bind:value={$updateForm.lastName}
					/>
					{#if $errors?.lastName}
						<ValidationError label="lastName">
							{$errors.lastName[0]}
						</ValidationError>
					{/if}
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-left">Bio</div>
			<div class="col-right">
				<div class="form-control">
					<label
						for="bio"
						class="sr-only">Bio</label
					>
					<textarea
						class="textarea-primary textarea w-full {$errors?.bio ? 'textarea-error' : ''}"
						id="bio"
						name="bio"
						rows={5}
						bind:value={$updateForm.bio}
					/>
					{#if $errors?.bio}
						<ValidationError label="bio">
							{$errors.bio[0]}
						</ValidationError>
					{/if}
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-left">Employment Status</div>
			<div class="col-right">
				<div class="form-control">
					<label
						for="eStatus"
						class="sr-only">Employment Status</label
					>
					<select
						class="select-primary w-full {$errors?.employmentStatus ? 'select-error' : ''}"
						id="eStatus"
						name="employmentStatus"
						bind:value={$updateForm.employmentStatus}
					>
						<option
							disabled
							selected={!$updateForm.employmentStatus}>Select Status...</option
						>
						{#each data.employmentStatuses as status (status.id)}
							<option value={String(status.id)}>{status.name}</option>
						{/each}
					</select>
					{#if $errors?.employmentStatus}
						<ValidationError label="eStatus">
							{$errors.employmentStatus[0]}
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
					href="/account/user"
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
