<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Shell from '$lib/components/Shell.svelte';
	import ValidationError from '$lib/components/ValidationError.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<Shell>
	<div class="update mx-auto max-w-3xl bg-white mt-16 mb-16">
		<form
			method="POST"
			action="?/updatejob"
			use:enhance={({ form, data }) => {
				return async ({ result }) => {
					await invalidateAll();
					await applyAction(result);
				};
			}}
		>
			<div class="p-6 border-b border-slate-300">
				<h1 class="text-2xl mb-2">{data.jobDetails.title}</h1>
				<p class="text-slate-600">{data.jobDetails.company.name}</p>
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
						class="input input-primary w-full {form?.errors?.title ? 'input-error' : ''}"
						name="title"
						id="title"
						placeholder="e.g. Software Engineer"
						value={data.jobDetails.title}
					/>
					{#if form?.errors?.title}
						<ValidationError label="title">
							{form.errors.title[0]}
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
						class="input input-primary w-full {form?.errors?.location ? 'input-error' : ''}"
						name="location"
						id="location"
						placeholder="e.g. San Francisco, CA"
						value={data.jobDetails.location}
					/>
					{#if form?.errors?.location}
						<ValidationError label="location">
							{form.errors.location[0]}
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
						class="select select-primary w-full  {form?.errors?.typeId ? 'select-error' : ''}"
						name="type"
						id="type"
						value={data.jobDetails.type.id}
					>
						{#each data.jobTypes as { id, name }}
							<option value={id}>{name}</option>
						{/each}
					</select>
					{#if form?.errors?.typeId}
						<ValidationError label="type">
							{form.errors.typeId[0]}
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
						class="textarea textarea-primary w-full {form?.errors?.description
							? 'textarea-error'
							: ''}"
						name="description"
						id="description"
						rows={6}
						placeholder="Job Description"
						value={data.jobDetails.description}
					/>
					{#if form?.errors?.description}
						<ValidationError label="description">
							{form.errors.description[0]}
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
						class="input input-primary w-full {form?.errors?.salary ? 'input-error' : ''}"
						type="number"
						name="salary"
						id="salary"
						placeholder="e.g. 100000"
						value={data.jobDetails.salary}
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
						class="select select-primary w-full {form?.errors?.categoryId ? 'select-error' : ''}"
						name="category"
						id="category"
						value={data.jobDetails.category.id}
					>
						{#each data.categories as { id, name }}
							<option value={id}>{name}</option>
						{/each}
					</select>
					{#if form?.errors?.categoryId}
						<ValidationError label="category">
							{form.errors.categoryId[0]}
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
						href="/jobs/{data.jobId}">Cancel</a
					>
				</div>
			</div>
		</form>
	</div>
</Shell>

<style lang="postcss">
	.update .row {
		@apply p-6 border-b border-slate-300 grid gap-4 sm:gap-8 items-center sm:grid-cols-[200px_1fr];
	}
	.update .col-left {
		@apply text-slate-700;
	}
	.update .col-right {
		@apply text-slate-900;
	}
</style>
