<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/auth';
	import type { AuthError } from 'firebase/auth';
	import { afterUpdate } from 'svelte';

	let emailInput: string = 'test@example.com';
	let passwordInput: string = 'password123';
	let authError: string;
	let processing = false;

	async function handleLogin() {
		try {
			authError = '';
			processing = true;
			await auth.emailLogin(emailInput, passwordInput);
			goto('/dashboard');
		} catch (error) {
			const fbLoginError = error as AuthError;
			authError = fbLoginError.code;
			processing = false;
		}
	}

	afterUpdate(() => {
		if ($auth) {
			goto('/dashboard');
		}
	});
</script>

<form
	class="block mx-auto my-24 max-w-md p-8 shadow-sm rounded-md bg-white"
	on:submit|preventDefault={handleLogin}
>
	<h1 class="text-2xl">Login</h1>
	<div class="my-4">
		<label
			for="email"
			class="sr-only">Email</label
		>
		<input
			type="email"
			name="email"
			class="p-2 border bg-white w-full block rounded-md"
			placeholder="email"
			required
			bind:value={emailInput}
		/>
	</div>
	<div class="my-4">
		<label
			for="password"
			class="sr-only">Password</label
		>
		<input
			type="password"
			name="password"
			class="p-2 border bg-white w-full block rounded-md"
			placeholder="password"
			required
			bind:value={passwordInput}
		/>
	</div>
	<button
		disabled={processing}
		class="bg-pink-800 text-white py-2 px-12 border-pink-800 inline-block rounded-md disabled:opacity-50"
	>
		{processing ? 'Logging In...' : 'Login'}
	</button>
	{#if authError}
		<p class="text-red-800 my-4">Authentication Error: <strong>{authError}</strong></p>
	{/if}
</form>
