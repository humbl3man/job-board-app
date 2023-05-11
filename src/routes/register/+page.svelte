<script lang="ts">
	import { APP_NAME } from '$lib/meta';
	import { applyAction, enhance } from '$app/forms';
	import Shell from '$lib/components/Shell.svelte';
	import ValidationError from '$lib/components/ValidationError.svelte';
	import { fly } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	let isProcessing = false;

	const { form, errors } = superForm(data.registerForm);

	let isEmployeer = false;
</script>

<svelte:head>
	<title>{APP_NAME} | Register</title>
</svelte:head>

<Shell>
	<div class="custom-wrapper max-w-md">
		<form
			method="POST"
			use:enhance={() => {
				isProcessing = true;
				return async ({ update, result }) => {
					await update();
					await applyAction(result);
					isProcessing = false;
				};
			}}
		>
			<h1 class="text-2xl font-bold">Create Account</h1>
			<div class="form-group my-4 w-full">
				<label
					for="email"
					class="label">Email</label
				>
				<input
					type="text"
					id="email"
					name="email"
					class="input-primary input w-full"
					bind:value={$form.email}
					data-invalid={$errors?.email}
				/>
				{#if $errors?.email}
					<ValidationError label="email">
						{$errors?.email[0]}
					</ValidationError>
				{/if}
			</div>
			<div class="form-group my-4 w-full">
				<label
					for="password"
					class="label">Password</label
				>
				<input
					type="password"
					id="password"
					name="password"
					class="input-primary input w-full"
					bind:value={$form.password}
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
						class="checkbox-primary checkbox mr-4"
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
						class="input-primary input w-full"
						data-invalid={$errors?.company}
						bind:value={$form.company}
					/>
					{#if $errors?.company}
						<ValidationError label="company">{$errors?.company[0]}</ValidationError>
					{/if}
				</div>
			{/if}
			<div class="mt-8 grid gap-4">
				<button class="btn-primary btn w-full {isProcessing ? 'btn-disabled' : ''}">
					{#if isProcessing}
						Processing...
					{:else}
						Register
					{/if}
				</button>
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
