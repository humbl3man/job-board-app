<script lang="ts">
	import { APP_NAME } from '$lib/meta';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import ValidationError from '$lib/components/ValidationError.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	let isProcessing = false;
	const { form: loginForm, errors } = superForm(data.form);
</script>

<svelte:head>
	<title>{APP_NAME} | Login</title>
</svelte:head>

<div class="custom-wrapper max-w-md">
	<form
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				await invalidateAll();
				await applyAction(result);
			};
		}}
	>
		<h1>Login</h1>
		<div class="form-control my-4 w-full">
			<label
				for="email"
				class="label"
			>
				<span class="label-text text-base">Email</span>
			</label>
			<input
				bind:value={$loginForm.email}
				type="email"
				id="email"
				name="email"
				data-invalid={$errors?.email}
				class="input input-bordered input-primary w-full"
			/>
			{#if $errors?.email}
				<ValidationError label="email">
					{$errors.email[0]}
				</ValidationError>
			{/if}
		</div>
		<div class="form-group my-4 w-full">
			<label
				for="password"
				class="label">Password</label
			>
			<input
				type="password"
				id="password"
				name="password"
				class="input input-bordered input-primary w-full"
				bind:value={$loginForm.password}
				data-invalid={$errors?.password}
			/>
			{#if $errors?.password}
				<ValidationError label="password">
					{$errors.password}
				</ValidationError>
			{/if}
		</div>
		<div class="grid gap-4">
			<button class="btn btn-primary w-full {isProcessing ? 'btn-disabled' : ''}"> Login </button>
			<span class="text-center">
				Don't have an account? <a
					href="/register"
					class="text-neutral underline">Register</a
				>
			</span>
		</div>
	</form>
</div>
