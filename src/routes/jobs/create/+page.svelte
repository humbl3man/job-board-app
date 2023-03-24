<script lang="ts">
	// import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { enhance } from '$app/forms';
	import Shell from '$lib/components/Shell.svelte';
	import ValidationError from '$lib/components/ValidationError.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form: createForm, errors } = superForm(data.form);
</script>

<!-- <SuperDebug data={$errors} /> -->

<Shell>
	<div class="mx-auto max-w-2xl bg-white p-8 my-16">
		<form
			method="POST"
			action="?/createjob"
			novalidate
			use:enhance
		>
			<h1>Create Job</h1>
			<div class="my-4 form-control">
				<label
					for="title"
					class="label">Title</label
				>
				<input
					type="text"
					class="input input-primary w-full"
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
			<div class="my-4 pb-4 relative">
				<label
					for="location"
					class="label">Location</label
				>
				<input
					type="text"
					class="input input-primary w-full"
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
			<div class="my-4 pb-4 relative">
				<label
					for="category"
					class="label">Category</label
				>
				<select
					class="select select-primary w-full"
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
			<div class="my-4 pb-4 relative">
				<label
					for="type"
					class="label">Job Type</label
				>
				<select
					class="select select-primary w-full"
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
			<div class="my-4 pb-4 relative">
				<label
					for="description"
					class="label">Description</label
				>
				<textarea
					class="textarea textarea-primary w-full"
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
			<div class="my-4 pb-4 relative">
				<label for="salary">Salary</label>
				<input
					class="input input-primary w-full"
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
			<div class="mt-8">
				<button class="btn btn-primary w-full">Create</button>
			</div>
		</form>
	</div>
</Shell>
