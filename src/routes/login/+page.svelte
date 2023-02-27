<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/auth';
	import type { AuthError } from 'firebase/auth';
	import { afterUpdate } from 'svelte';
	import { Alert, Button, TextInput, Grid } from '@svelteuidev/core';
	import { CrossCircled } from 'radix-icons-svelte';

	let emailInput: string;
	let passwordInput: string;
	let authError: string;
	let processing = false;

	function beforeStart() {
		authError = '';
		processing = true;
	}

	function handleAuthError(error: AuthError) {
		authError = error.code;
		processing = false;
	}

	async function handleLogin() {
		try {
			beforeStart();
			await auth.emailLogin(emailInput, passwordInput);
			goto('/dashboard');
		} catch (error) {
			handleAuthError(error as AuthError);
		}
	}

	async function handleGoogleSignIn() {
		try {
			beforeStart();
			await auth.signInWithGoogle();
			goto('/dashboard');
		} catch (error) {
			handleAuthError(error as AuthError);
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
	{#if authError}
		<div class="my-5">
			<Alert
				title="Authentication Error"
				variant="outline"
				radius="sm"
				color="pink"
				icon={CrossCircled}
			>
				{authError}
			</Alert>
		</div>
	{/if}
	<div class="my-4">
		<label
			for="email"
			class="sr-only">Email</label
		>
		<TextInput
			label="Email"
			type="email"
			name="email"
			size="lg"
			radius="sm"
			bind:value={emailInput}
			required
		/>
	</div>
	<div class="my-4">
		<TextInput
			label="Password"
			type="password"
			name="password"
			size="lg"
			radius="sm"
			bind:value={passwordInput}
			required
		/>
	</div>

	<Grid
		spacing={10}
		align="center"
	>
		<Grid.Col span={4}>
			<Button
				color="pink"
				size="md"
				loading={processing}
				uppercase
			>
				Login
			</Button>
		</Grid.Col>
		<Grid.Col span={8}>
			Don't have an account? <a
				href="/register"
				class="text-blue-500 underline">Register</a
			>
		</Grid.Col>
	</Grid>
	<!-- <div class="mt-6">
		<Button
			color="blue"
			variant="filled"
			size="md"
			loading={processing}
			on:click={handleGoogleSignIn}>Sign In With Google</Button
		>
	</div> -->
</form>
