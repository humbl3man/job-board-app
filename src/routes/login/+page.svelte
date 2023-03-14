<script lang="ts">
	import { Alert, Button, TextInput, Grid } from '@svelteuidev/core';
	import { CrossCircled } from 'radix-icons-svelte';
	import { APP_NAME } from '$lib/meta';
	import { page } from '$app/stores';

	let emailInput: string;
	let passwordInput: string;
	let authError: string;
	let processing = false;

	let returnURL = new URLSearchParams($page.url.search)?.get('returnURL') ?? null;
</script>

<svelte:head>
	<title>{APP_NAME} | Login</title>
</svelte:head>
<form class="block mx-auto my-24 max-w-md p-8 shadow-sm rounded-md bg-white">
	<h1 class="text-2xl">Login</h1>
	{#if authError}
		<div class="my-5">
			<Alert
				title="Authentication Error"
				variant="filled"
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
				color="indigo"
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
</form>
