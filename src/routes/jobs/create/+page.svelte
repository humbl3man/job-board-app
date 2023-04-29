<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import ValidationError from '$lib/components/ValidationError.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { invalidateAll } from '$app/navigation';

	export let data;

	const { form: createForm, errors } = superForm(data.form);
</script>

<div class="custom-wrapper max-w-4xl">
	<form
		method="POST"
		action="?/createjob"
		novalidate
		use:enhance={() => {
			return async ({ result }) => {
				await invalidateAll();
				await applyAction(result);
			};
		}}
	>
		<h1>Create Job</h1>
		<div class="form-control my-4">
			<label
				for="title"
				class="label">Title</label
			>
			<input
				type="text"
				class="input-primary input w-full"
				name="title"
				id="title"
				placeholder="e.g. Software Engineer"
				bind:value={$createForm.title}
				data-invalid={$errors?.title}
			/>
			{#if $errors?.title}
				<ValidationError label="title">
					{$errors.title[0]}
				</ValidationError>
			{/if}
		</div>
		<div class="my-4 grid gap-4 md:grid-cols-2">
			<div class="form-control">
				<label
					for="location"
					class="label">Location</label
				>
				<input
					type="text"
					class="input-primary input w-full"
					name="location"
					id="location"
					placeholder="e.g. San Francisco, CA"
					bind:value={$createForm.location}
					data-invalid={$errors?.location}
				/>
				{#if $errors?.location}
					<ValidationError label="location">
						{$errors.location[0]}
					</ValidationError>
				{/if}
			</div>
			<div class="form-control">
				<label
					class="label"
					for="salary">Salary</label
				>
				<input
					class="input-primary input w-full"
					type="number"
					name="salary"
					id="salary"
					placeholder="e.g. 100000"
				/>
				{#if $errors?.salary}
					<ValidationError label="salary">
						{$errors.salary[0]}
					</ValidationError>
				{/if}
			</div>
		</div>
		<div class="my-4 grid gap-4 md:grid-cols-2">
			<div class="form-control">
				<label
					for="category"
					class="label">Category</label
				>
				<select
					class="select-primary select w-full"
					name="categoryId"
					id="category"
					bind:value={$createForm.categoryId}
					data-invalid={$errors?.categoryId}
				>
					<option
						disabled
						selected>Select Category...</option
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
			<div class="form-control">
				<label
					for="type"
					class="label">Job Type</label
				>
				<select
					class="select-primary select w-full"
					name="typeId"
					id="type"
					bind:value={$createForm.typeId}
					data-invalid={$errors?.typeId}
				>
					<option
						disabled
						selected>Select Type...</option
					>
					{#each data.jobTypes as { id, name }}
						<option value={id}>{name}</option>
					{/each}
				</select>
				{#if $errors?.typeId}
					<ValidationError>
						{$errors.typeId[0]}
					</ValidationError>
				{/if}
			</div>
		</div>
		<div class="relative my-4 pb-4">
			<label
				for="description"
				class="label">Description</label
			>
			<textarea
				class="textarea-primary textarea w-full"
				name="description"
				id="description"
				rows={10}
				placeholder="Description..."
				bind:value={$createForm.description}
				data-invalid={$errors?.description}
			/>
			{#if $errors?.description}
				<ValidationError label="description">
					{$errors.description[0]}
				</ValidationError>
			{/if}
		</div>
		<div class="mt-8">
			<button class="btn-primary btn w-full">Create</button>
		</div>
	</form>
</div>
