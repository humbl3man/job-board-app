<script lang="ts">
	// import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { APP_NAME } from '$lib/meta';
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import Shell from '$lib/components/Shell.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import ValidationError from '$lib/components/ValidationError.svelte';
	import { fly } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	export let form: ActionData;
	const { form: registerForm, errors } = superForm(data.form);

	let isEmployeer = false;
</script>

<svelte:head>
	<title>{APP_NAME} | Register</title>
</svelte:head>

<!-- <SuperDebug data={form} /> -->

<Shell>
	<div class="custom-wrapper max-w-md">
		<form
			method="POST"
			action="?/register"
			use:enhance
		>
			<h1>Create Account</h1>
			{#if form?.userExists}
				<ErrorMessage>User Already Exists</ErrorMessage>
			{/if}
			<div class="form-group w-full my-4">
				<label
					for="email"
					class="label">Email</label
				>
				<input
					type="text"
					id="email"
					name="email"
					class="input input-primary w-full"
					bind:value={$registerForm.email}
					data-invalid={$errors?.email}
				/>
				{#if $errors?.email}
					<ValidationError label="email">
						{$errors?.email[0]}
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
					class="input input-primary w-full"
					bind:value={$registerForm.password}
					data-invalid={$errors?.password}
				/>
				{#if $errors?.password}
					<ValidationError label="password">{$errors?.password[0]}</ValidationError>
				{/if}
			</div>
			<div class="form-control w-max">
				<label class="label cursor-pointer">
					<input
						type="checkbox"
						checked={isEmployeer}
						class="checkbox checkbox-primary mr-4"
						on:change={() => (isEmployeer = !isEmployeer)}
						value={isEmployeer}
						name="isEmployer"
					/>
					<span class="label-text">I am an employer</span>
				</label>
			</div>
			{#if isEmployeer}
				<div
					in:fly={{ y: 20, duration: 100 }}
					class="my-4"
				>
					<label
						for="company_name"
						class="label">Company Name</label
					>
					<input
						type="text"
						id="company_name"
						name="company"
						class="input input-primary w-full"
						data-invalid={$errors?.company}
						bind:value={$registerForm.company}
					/>
					{#if $errors?.company}
						<ValidationError label="company">{$errors?.company[0]}</ValidationError>
					{/if}
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
	</div>
</Shell>
