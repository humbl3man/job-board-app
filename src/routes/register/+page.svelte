<script lang="ts">
	import { APP_NAME } from '$lib/meta';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import Shell from '$lib/components/Shell.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import ValidationError from '$lib/components/ValidationError.svelte';

	export let form: ActionData;

	let isEmployeer = false;
</script>

<svelte:head>
	<title>{APP_NAME} | Register</title>
</svelte:head>

<Shell>
	<form
		class="block mx-auto my-24 max-w-md bg-base-100 p-8 rounded-md shadow-sm"
		method="POST"
		action="?/register"
		novalidate
		use:enhance
	>
		<h1>Create Account</h1>
		{#if form?.exists}
			<ErrorMessage>User Already Exists</ErrorMessage>
		{/if}
		<div class="form-group w-full my-4">
			<label
				for="email"
				class="label">Email</label
			>
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
					{form.fieldErrors?.email[0]}
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
				<ValidationError label="password">{form?.fieldErrors?.password[0]}</ValidationError>
			{/if}
		</div>
		<!-- TODO: replace with checkbox -->
		<!-- <div class="my-4">
			<Switch
				color="indigo"
				radius="xl"
				size="md"
				label="Are you an employer?"
				checked={isEmployeer}
				on:change={() => (isEmployeer = !isEmployeer)}
			/>
		</div> -->
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
		<div class="grid gap-4 mt-8">
			<button class="btn btn-primary w-full"> Register </button>
			<span class="text-center">
				Already have account? <a
					href="/login"
					class="text-neutral underline">Login</a
				>
			</span>
		</div>
	</form>
</Shell>
