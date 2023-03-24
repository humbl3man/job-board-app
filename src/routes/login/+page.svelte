<script lang="ts">
	import { APP_NAME } from '$lib/meta';
	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import Shell from '$lib/components/Shell.svelte';
	import ValidationError from '$lib/components/ValidationError.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	export let form: ActionData;
	const { form: loginForm, errors } = superForm(data.form);
</script>

<svelte:head>
	<title>{APP_NAME} | Login</title>
</svelte:head>

<!-- <SuperDebug data={$errors} /> -->

<Shell>
	<div class="max-w-md custom-wrapper">
		<form
			method="POST"
			action="?/login"
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
					class="input w-full input-bordered input-primary"
				/>
				{#if $errors?.email}
					<ValidationError label="email">
						{$errors.email[0]}
					</ValidationError>
				{/if}
			</div>
			<div class="form-group w-full my-4">
				<label
					for="password"
					class="label">Password</label
				>
				<input
					type="password"
					id="password"
					name="password"
					class="input w-full input-bordered input-primary"
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
				<button class="btn btn-primary w-full"> Login </button>
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
