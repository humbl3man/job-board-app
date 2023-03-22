<script lang="ts">
	import { APP_NAME } from '$lib/meta';
	import { applyAction, enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import Shell from '$lib/components/Shell.svelte';
	import ValidationError from '$lib/components/ValidationError.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';

	export let form: ActionData;
</script>

<svelte:head>
	<title>{APP_NAME} | Login</title>
</svelte:head>

<Shell>
	<form
		class="block mx-auto my-24 max-w-md bg-base-100 p-8 rounded-md shadow-sm"
		method="POST"
		action="?/login"
		novalidate
		use:enhance={() => {
			return async ({ result }) => {
				await invalidateAll();
				await applyAction(result);
			};
		}}
	>
		<h1>Login</h1>
		{#if form?.invalid}
			<ErrorMessage>User Doesn't exist</ErrorMessage>
		{/if}
		{#if form?.credentials}
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
				value={form?.data?.email ?? ''}
				type="text"
				id="email"
				name="email"
				class="input w-full input-bordered input-primary {form?.fieldErrors?.email
					? 'input-error'
					: ''}"
			/>
			{#if form?.fieldErrors?.email}
				<ValidationError label="email">
					{form?.fieldErrors?.email[0]}
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
				class="input w-full input-bordered input-primary {form?.fieldErrors?.password
					? 'input-error'
					: ''}"
			/>
			{#if form?.fieldErrors?.password}
				<ValidationError label="password">
					{form?.fieldErrors?.password[0]}
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
</Shell>
