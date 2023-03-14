<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { Alert, Button, TextInput, Grid, Anchor, Switch } from '@svelteuidev/core';
	import { CrossCircled } from 'radix-icons-svelte';
	import { APP_NAME } from '$lib/meta';
	import { page } from '$app/stores';

	let email: string;
	let password: string;
	let companyName: string;
	let processing = false;
	let isEmployeer = false;

	let returnURL = new URLSearchParams($page.url.search)?.get('returnURL') ?? null;

	function handleAuthError(error: string) {
		processing = false;
	}
</script>

<svelte:head>
	<title>{APP_NAME} | Register</title>
</svelte:head>
<form class="block mx-auto my-24 max-w-md p-8 shadow-sm rounded-md bg-white">
	<h1 class="text-2xl">Create Account</h1>
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
</form>
