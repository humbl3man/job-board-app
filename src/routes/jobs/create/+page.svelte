<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="mx-auto max-w-xl bg-white p-8 my-16">
	<form
		method="POST"
		action="?/createjob"
	>
		<h1>Create Job</h1>
		<div class="my-4">
			<label
				for="title"
				class="label">Title</label
			>
			<input
				type="text"
				class="input w-full"
				name="title"
				id="title"
				placeholder="e.g. Software Engineer"
			/>
		</div>
		<div class="my-4">
			<label
				for="location"
				class="label">Location</label
			>
			<input
				type="text"
				class="input w-full"
				name="location"
				id="location"
				placeholder="e.g. San Francisco, CA"
			/>
		</div>
		<div class="my-4">
			<label
				for="category"
				class="label">Category</label
			>
			<select
				class="input w-full"
				name="category"
				id="category"
			>
				<option value="">Select Category...</option>
				{#each data.categories as { id, name }}
					<option value={id}>{name}</option>
				{/each}
			</select>
		</div>
		<div class="my-4">
			<label
				for="type"
				class="label">Job Type</label
			>
			<select
				class="input w-full"
				name="type"
				id="type"
			>
				<option value="">Select Type...</option>
				{#each data.jobTypes as { id, name }}
					<option value={id}>{name}</option>
				{/each}
			</select>
		</div>
		<div class="my-4">
			<label
				for="description"
				class="label">Description</label
			>
			<textarea
				class="input w-full"
				name="description"
				id="description"
				rows={6}
				placeholder="Job Description"
			/>
		</div>
		<div class="my-4">
			<label for="salary">Salary</label>
			<input
				class="input w-full"
				type="number"
				name="salary"
				id="salary"
				placeholder="e.g. 100000"
			/>
		</div>
		<div class="my-4">
			<button class="button w-full">Create</button>
		</div>
	</form>
</div>
