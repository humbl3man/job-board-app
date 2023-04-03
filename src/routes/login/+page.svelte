<script lang="ts">
	import { APP_NAME } from '$lib/meta';
	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import Shell from '$lib/components/Shell.svelte';
	import ValidationError from '$lib/components/ValidationError.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/stores';

	export let data: PageData;
	export let form: ActionData;

	let redirectTo = $page.url.searchParams.get('redirectTo') ?? '';
	let isProcessing = false;

	const { form: loginForm, errors } = superForm(data.form);
</script>

<svelte:head>
	<title>{APP_NAME} | Login</title>
</svelte:head>

<!-- <SuperDebug data={$errors} /> -->

<Shell>
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
			{#if form?.invalidUser}
				<ErrorMessage>User Doesn't exist</ErrorMessage>
			{/if}
			{#if form?.invalidCredentials}
				<ErrorMessage>Invalid credentials</ErrorMessage>
			{/if}
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
					class="input-bordered input-primary input w-full"
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
					class="input-bordered input-primary input w-full"
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
				<button class="btn-primary btn w-full {isProcessing ? 'btn-disabled' : ''}"> Login </button>
				<span class="text-center">
					Don't have an account? <a
						href="/register"
						class="text-neutral underline">Register</a
					>
				</span>
			</div>
		</form>
	</div>
</Shell>
