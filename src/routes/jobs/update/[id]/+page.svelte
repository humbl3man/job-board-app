<script lang="ts">
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Shell from '$lib/components/Shell.svelte';
	import ValidationError from '$lib/components/ValidationError.svelte';
	import type { ActionData, PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	export let form: ActionData;

	const { form: updateForm, errors } = superForm(data.form);
</script>

<!-- <SuperDebug data={$errors} /> -->

<Shell>
	<div class="update custom-wrapper max-w-3xl">
		<form
			method="POST"
			action="?/updatejob"
			use:enhance={() => {
				return async ({ result }) => {
					await invalidateAll();
					await applyAction(result);
				};
			}}
		>
			<div class="py-6 border-b border-slate-300">
				<h1 class="text-2xl mb-2 flex items-center">
					{data.title}
					<span class="badge badge-lg ml-2">Update</span>
				</h1>
				<p class="text-slate-600">{data.companyName}</p>
			</div>

			<div class="row">
				<div class="col-left">Title</div>
				<div class="col-right pb-4 relative">
					<label
						for="title"
						class="sr-only"
					/>
					<input
						type="text"
						class="input input-primary w-full"
						name="title"
						id="title"
						placeholder="e.g. Software Engineer"
						bind:value={$updateForm.title}
						data-invalid={$errors?.title}
					/>
					{#if $errors?.title}
						<ValidationError label="title">
							{$errors.title[0]}
						</ValidationError>
					{/if}
				</div>
			</div>
			<div class="row">
				<div class="col-left">Location</div>
				<div class="col-right pb-4 relative">
					<label
						for="location"
						class="sr-only"
					/>
					<input
						type="text"
						class="input input-primary w-full"
						name="location"
						id="location"
						placeholder="e.g. San Francisco, CA"
						bind:value={$updateForm.location}
						data-invalid={$errors?.location}
					/>
					{#if $errors?.location}
						<ValidationError label="location">
							{$errors.location[0]}
						</ValidationError>
					{/if}
				</div>
			</div>
			<div class="row">
				<div class="col-left">Type</div>
				<div class="col-right pb-4 relative">
					<label
						for="type"
						class="sr-only"
					/>
					<select
						class="select select-primary w-full"
						name="typeId"
						id="type"
						bind:value={$updateForm.typeId}
						data-invalid={$errors?.typeId}
					>
						{#each data.jobTypes as { id, name }}
							<option value={id}>{name}</option>
						{/each}
					</select>
					{#if $errors?.typeId}
						<ValidationError label="type">
							{$errors.typeId[0]}
						</ValidationError>
					{/if}
				</div>
			</div>
			<div class="row">
				<div class="col-left">Description</div>
				<div class="col-right pb-4 relative">
					<label
						for="description"
						class="sr-only"
					/>
					<textarea
						class="textarea textarea-primary w-full"
						name="description"
						id="description"
						rows={10}
						placeholder="Job Description"
						bind:value={$updateForm.description}
						data-invalid={$errors?.description}
					/>
					{#if $errors?.description}
						<ValidationError label="description">
							{$errors.description[0]}
						</ValidationError>
					{/if}
				</div>
			</div>

			<div class="row">
				<div class="col-left">Salary</div>
				<div class="col-right pb-4 relative">
					<label
						for="salary"
						class="sr-only"
					/>
					<input
						class="input input-primary w-full"
						type="number"
						name="salary"
						id="salary"
						placeholder="e.g. 100000"
						bind:value={$updateForm.salary}
						data-invalid={$errors?.salary}
					/>
					{#if form?.errors?.salary}
						<ValidationError label="salary">
							{form.errors.salary[0]}
						</ValidationError>
					{/if}
				</div>
			</div>
			<div class="row">
				<div class="col-left">Category</div>
				<div class="col-right pb-4 relative">
					<label
						for="category"
						class="sr-only"
					/>
					<select
						class="select select-primary w-full"
						name="categoryId"
						id="category"
						bind:value={$updateForm.categoryId}
						data-invalid={$errors?.categoryId}
					>
						{#each data.categories as { id, name }}
							<option value={id}>{name}</option>
						{/each}
					</select>
					{#if $errors?.categoryId}
						<ValidationError label="category">
							{$errors.categoryId[0]}
						</ValidationError>
					{/if}
				</div>
			</div>
			<div class="row">
				<div class="col-left" />
				<div class="col-right pb-4 relative flex justify-end">
					<button class="btn btn-primary mr-2">Update</button>
					<a
						class="btn btn-ghost"
						href="/jobs/{data.id}">Cancel</a
					>
				</div>
			</div>
		</form>
	</div>
</Shell>

<style lang="postcss">
	.update .row {
		@apply py-6 border-b border-slate-300 grid gap-4 sm:gap-8 items-center sm:grid-cols-[200px_1fr] last-of-type:border-0;
	}
	.update .col-left {
		@apply text-slate-700;
	}
	.update .col-right {
		@apply text-slate-900;
	}
</style>
