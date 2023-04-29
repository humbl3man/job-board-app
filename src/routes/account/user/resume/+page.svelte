<script lang="ts">
	import { enhance } from '$app/forms';
	import ValidationError from '$lib/components/ValidationError.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data;
	const { form, errors } = superForm(data.form);
</script>

<!-- <SuperDebug data={$form} /> -->

<h1 class="mb-2 text-2xl">Resume</h1>
<form
	method="POST"
	novalidate
	use:enhance
>
	<div class="form-control">
		<label
			class="label"
			for="url">Resume URL</label
		>
		<input
			class="input-primary input md:w-2/4 {$errors.url ? 'input-error' : ''}"
			type="url"
			id="url"
			name="url"
			bind:value={$form.url}
		/>
		{#if $errors?.url}
			<ValidationError>
				{$errors.url[0]}
			</ValidationError>
		{/if}
	</div>
	<div class="mt-4">
		<button class="btn-primary btn">Submit</button>
	</div>
</form>
