<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/auth';
	import type { AuthError } from 'firebase/auth';
	import { afterUpdate } from 'svelte';
	import { Alert, Button, TextInput, Grid, Anchor, Switch } from '@svelteuidev/core';
	import { CrossCircled } from 'radix-icons-svelte';
	import { APP_NAME } from '$lib/meta';
	import { page } from '$app/stores';

	let email: string;
	let password: string;
	let companyName: string;
	let authError: string;
	let isEmployeer = false;
	let processing = false;

	let returnURL = new URLSearchParams($page.url.search)?.get('returnURL') ?? null;

	function beforeStart() {
		authError = '';
		processing = true;
	}

	function handleAuthError(error: AuthError) {
		authError = error.code;
		processing = false;
	}

	async function handleRegister() {
		try {
			beforeStart();
			await auth.registerWithEmail(email, password, companyName);
			if (returnURL) {
				goto(returnURL);
			} else {
				goto('/dashboard');
			}
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

<svelte:head>
	<title>{APP_NAME} | Register</title>
</svelte:head>
<form
	class="block mx-auto my-24 max-w-md p-8 shadow-sm rounded-md bg-white"
	on:submit|preventDefault={handleRegister}
>
	<h1 class="text-2xl">Create Account</h1>
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
			bind:value={email}
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
			bind:value={password}
			required
		/>
	</div>
	<div class="mt-4 mb-8">
		<Switch
			color="indigo"
			radius="xl"
			size="md"
			label="Are you an employer?"
			checked={isEmployeer}
			on:change={() => (isEmployeer = !isEmployeer)}
		/>
	</div>
	{#if isEmployeer}
		<div class="my-4">
			<TextInput
				label="Company Name"
				type="text"
				name="companyname"
				size="lg"
				radius="sm"
				bind:value={companyName}
				required
			/>
		</div>
	{/if}
	<Grid
		spacing={10}
		align="center"
	>
		<Grid.Col span={4}>
			<Button
				color="indigo"
				size="md"
				loading={processing}
				uppercase
			>
				Create
			</Button>
		</Grid.Col>
		<Grid.Col span={8}>
			Already have account? <a
				href="/login"
				class="text-blue-500 underline">Login</a
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
