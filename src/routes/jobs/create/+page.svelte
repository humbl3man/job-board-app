<script lang="ts">
	import { page } from '$app/stores';
	import { Alert, Button, TextInput } from '@svelteuidev/core';
</script>

<div class="mx-auto max-w-xl px-4 my-16">
	<form
		method="POST"
		action="?/createjob"
	>
		<input
			type="hidden"
			name="createdBy"
		/>
		<input
			type="hidden"
			name="company"
		/>
		<div class="my-4">
			<TextInput
				type="text"
				name="title"
				id="title"
				label="Title"
				size="lg"
				radius="sm"
				required
			/>
		</div>
		<div class="my-4">
			<TextInput
				size="lg"
				radius="sm"
				label="Category"
				type="text"
				name="category"
				id="category"
				required
			/>
		</div>
		<div class="my-4">
			<TextInput
				size="lg"
				radius="sm"
				label="Description"
				name="description"
				id="description"
				rows={5}
				required
			/>
		</div>
		<div class="my-4">
			<TextInput
				size="lg"
				radius="sm"
				label="Expectations"
				name="expectations"
				id="expectations"
				rows={5}
				required
			/>
		</div>
		<div class="my-4">
			<TextInput
				type="number"
				name="salary"
				id="salary"
				size="lg"
				radius="sm"
				label="Salary"
				required
			/>
		</div>
		<div class="my-4">
			<TextInput
				type="text"
				name="skills"
				id="skills"
				label="Skills"
				size="lg"
				radius="sm"
				placeholder="Comma separated"
				required
			/>
		</div>
		<div class="my-4">
			<Button
				color="grape"
				size="lg">Submit</Button
			>
		</div>
	</form>
</div>
