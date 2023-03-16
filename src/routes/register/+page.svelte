<script lang="ts">
	import { Switch } from '@svelteuidev/core';
	import { APP_NAME } from '$lib/meta';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let isEmployeer = false;
</script>

<svelte:head>
	<title>{APP_NAME} | Register</title>
</svelte:head>
<form
	class="block mx-auto my-24 max-w-md p-8 shadow-sm rounded-md bg-white"
	method="POST"
	action="?/register"
	novalidate
	use:enhance
>
	<h1>Create Account</h1>
	{#if form?.exists}
		<p class="text-red-700 font-bold my-2">User Exists</p>
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
	<div class="my-4">
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
			<label
				for="company_name"
				class="label">Company Name</label
			>
			<input
				type="text"
				id="company_name"
				name="company"
				class="w-full input"
				value={form?.data?.company ?? ''}
			/>
		</div>
	{/if}
	<div class="grid gap-4">
		<button class="button"> Create </button>
		<span class="text-center">
			Already have account? <a
				href="/login"
				class="text-blue-500 underline">Login</a
			>
		</span>
	</div>
</form>
