<script lang="ts">
	import { enhance } from '$app/forms';
	import Shell from '$lib/components/Shell.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<pre>
	{JSON.stringify(form, null, 2)}
</pre>

<Shell>
	<div class="mx-auto max-w-2xl bg-white p-8 my-16">
		<form
			method="POST"
			action="?/createjob"
			novalidate
			use:enhance
		>
			<h1>Create Job</h1>
			<div class="my-4 pb-4 relative">
				<label
					for="title"
					class="label">Title</label
				>
				<input
					type="text"
					class="input w-full {form?.errors?.title ? 'error' : ''}"
					name="title"
					id="title"
					placeholder="e.g. Software Engineer"
					value={form?.data?.title ?? ''}
				/>
				{#if form?.errors?.title}
					<div
						class="bg-red-50 text-red-900 py-1 px-3 text-sm absolute left-0 leading-none -bottom-[8px]"
					>
						{form.errors.title[0]}
					</div>
				{/if}
			</div>
			<div class="my-4 pb-4 relative">
				<label
					for="location"
					class="label">Location</label
				>
				<input
					type="text"
					class="input w-full {form?.errors?.location ? 'error' : ''}"
					name="location"
					id="location"
					placeholder="e.g. San Francisco, CA"
				/>
				{#if form?.errors?.location}
					<div
						class="bg-red-50 text-red-900 py-1 px-3 text-sm absolute left-0 leading-none -bottom-[8px]"
					>
						{form.errors.location[0]}
					</div>
				{/if}
			</div>
			<div class="my-4 pb-4 relative">
				<label
					for="category"
					class="label">Category</label
				>
				<select
					class="input w-full {form?.errors?.categoryId ? 'error' : ''}"
					name="category"
					id="category"
				>
					<option value="">Select Category...</option>
					{#each data.categories as { id, name }}
						<option value={id}>{name}</option>
					{/each}
				</select>
				{#if form?.errors?.categoryId}
					<div
						class="bg-red-50 text-red-900 py-1 px-3 text-sm absolute left-0 leading-none -bottom-[8px]"
					>
						{form.errors.categoryId[0]}
					</div>
				{/if}
			</div>
			<div class="my-4 pb-4 relative">
				<label
					for="type"
					class="label">Job Type</label
				>
				<select
					class="input w-full  {form?.errors?.typeId ? 'error' : ''}"
					name="type"
					id="type"
				>
					<option value="">Select Type...</option>
					{#each data.jobTypes as { id, name }}
						<option value={id}>{name}</option>
					{/each}
				</select>
				{#if form?.errors?.typeId}
					<div
						class="bg-red-50 text-red-900 py-1 px-3 text-sm absolute left-0 leading-none -bottom-[8px]"
					>
						{form.errors.typeId[0]}
					</div>
				{/if}
			</div>
			<div class="my-4 pb-4 relative">
				<label
					for="description"
					class="label">Description</label
				>
				<textarea
					class="input w-full description  {form?.errors?.description ? 'error' : ''}"
					name="description"
					id="description"
					rows={6}
					placeholder="Job Description"
				/>
				{#if form?.errors?.description}
					<div
						class="bg-red-50 text-red-900 py-1 px-3 text-sm absolute left-0 leading-none -bottom-[2px]"
					>
						{form.errors.description[0]}
					</div>
				{/if}
			</div>
			<div class="my-4 pb-4 relative">
				<label for="salary">Salary</label>
				<input
					class="input w-full  {form?.errors?.salary ? 'error' : ''}"
					type="number"
					name="salary"
					id="salary"
					placeholder="e.g. 100000"
				/>
				{#if form?.errors?.salary}
					<div
						class="bg-red-50 text-red-900 py-1 px-3 text-sm absolute left-0 leading-none -bottom-[8px]"
					>
						{form.errors.salary[0]}
					</div>
				{/if}
			</div>
			<div class="mt-8">
				<button class="button w-full">Create</button>
			</div>
		</form>
	</div>
</Shell>

<style>
	.description {
		padding-bottom: 0;
	}
</style>
