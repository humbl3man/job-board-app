<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { auth } from '$lib/auth';
	import { user } from '$lib/user';
	import { Alert, Button, TextInput } from '@svelteuidev/core';
	import { onMount } from 'svelte';

	// onMount(() => {
	// 	if (!$auth || !$user?.isEmployer) {
	// 		goto('/jobs');
	// 	}
	// });

	console.log($page.form?.error);
</script>

<div class="mx-auto max-w-xl px-4 my-16">
	{#if $page.form?.error}
		<Alert
			color="red"
			title="Error"
			variant="filled">Failed to add</Alert
		>
	{/if}
	{#if $page.form?.successMessage}
		<Alert
			color="green"
			title="Success">{$page.form.successMessage}</Alert
		>
	{/if}
	<form method="POST">
		<input
			type="hidden"
			name="createdBy"
			value={$user?.id ?? ''}
		/>
		<input
			type="hidden"
			name="company"
			value={$user?.companyName ?? ''}
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
