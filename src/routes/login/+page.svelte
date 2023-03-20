<script lang="ts">
	import { Switch } from '@svelteuidev/core';
	import { APP_NAME } from '$lib/meta';
	import { applyAction, enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import Shell from '$lib/components/Shell.svelte';

	export let form: ActionData;
</script>

<svelte:head>
	<title>{APP_NAME} | Login</title>
</svelte:head>

<Shell>
	<form
		class="block mx-auto my-24 max-w-md p-8 shadow-sm rounded-md bg-white"
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
			<p class="text-red-700 font-bold my-2">User Doesn't exist</p>
		{/if}
		{#if form?.credentials}
			<p class="text-red-700 font-bold my-2">Invalid credentials</p>
		{/if}
		<div class="my-4">
			<label
				for="email"
				class="label">Email</label
			>
			<input
				value={form?.data?.email ?? ''}
				type="text"
				id="email"
				name="email"
				class="w-full input {form?.fieldErrors?.email ? 'error' : ''}"
			/>
			{#if form?.fieldErrors?.email}
				<p class="text-red-600">{form?.fieldErrors?.email[0]}</p>
			{/if}
		</div>
		<div class="my-4">
			<label
				for="password"
				class="label">Password</label
			>
			<input
				type="password"
				id="password"
				name="password"
				class="w-full input {form?.fieldErrors?.password ? 'error' : ''}"
			/>
			{#if form?.fieldErrors?.password}
				<p class="text-red-600">{form?.fieldErrors?.password[0]}</p>
			{/if}
		</div>
		<div class="grid gap-4">
			<button class="button"> Login </button>
			<span class="text-center">
				Don't have an account? <a
					href="/register"
					class="text-blue-500 underline">Register</a
				>
			</span>
		</div>
	</form>
</Shell>
