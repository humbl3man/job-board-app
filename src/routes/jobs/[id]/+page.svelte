<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription
	} from '@rgossiaux/svelte-headlessui';
	import { formatCurrency } from '$lib/utils/formatCurrency';
	import type { PageData } from './$types';

	export let data: PageData;
	let showDeleteConfirmation = false;
	let deleteform: HTMLFormElement;
	function getdeleteform(el: HTMLFormElement) {
		deleteform = el;
	}
</script>

<Dialog
	class="fixed inset-0 w-full h-full z-10 flex items-center justify-center"
	open={showDeleteConfirmation}
	on:close={() => (showDeleteConfirmation = false)}
>
	<DialogOverlay class="absolute backdrop-blur-sm bg-white/40 inset-0 w-full h-full z-20" />
	<div class="bg-white p-10 relative z-50 border-2 border-slate-600 rounded-md">
		<DialogTitle class="mb-2">Delete this job?</DialogTitle>
		<DialogDescription>
			<p>Are you sure you want to delete this job? This can't be undone.</p>
			<div class="grid grid-flow-col gap-4 justify-end mt-6">
				<button
					class="bg-red-50 text-red-900 px-4 py-1 rounded-md"
					on:click={() => deleteform.submit()}>Yes, Delete it</button
				>
				<button
					class="bg-slate-100 text-slate-900 px-4 py-1 rounded-md"
					on:click={() => (showDeleteConfirmation = false)}>Cancel</button
				>
			</div>
		</DialogDescription>
	</div>
</Dialog>

<div class="jobdetails mx-auto max-w-3xl bg-white mt-16 mb-16">
	<div class="p-6 border-b border-slate-300">
		<h1 class="text-2xl mb-2">{data.jobDetails.title}</h1>
		<p class="text-slate-600">{data.jobDetails.company.name}</p>
	</div>
	<div class="row">
		<div class="col-left">Location</div>
		<div class="col-right">
			{data.jobDetails.location}
		</div>
	</div>
	<div class="row">
		<div class="col-left">Type</div>
		<div class="col-right">
			{data.jobDetails.type.name}
		</div>
	</div>
	<div class="row">
		<div class="col-left">Description</div>
		<div class="col-right">
			{data.jobDetails.description}
		</div>
	</div>

	<div class="row">
		<div class="col-left">Salary</div>
		<div class="col-right">{formatCurrency(data.jobDetails.salary)}</div>
	</div>
	<div class="row">
		<div class="col-left">Category</div>
		<div class="col-right">{data.jobDetails.category.name}</div>
	</div>
	<div class="row">
		<div class="col-left" />
		<div class="col-right">
			{#if data.showDeleteButton}
				<form
					method="POST"
					action="?/deletejob"
					use:getdeleteform
					use:enhance={({ form, data }) => {
						console.log(data);
						return async ({ result }) => {
							await invalidateAll();
							await applyAction(result);
						};
					}}
				>
					<button
						type="button"
						class="button button--sm"
						on:click={() => (showDeleteConfirmation = true)}>Delete Job</button
					>
				</form>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	.jobdetails .row {
		@apply p-6 border-b border-slate-300 grid gap-4 sm:gap-8 items-center sm:grid-cols-[200px_1fr];
	}
	.jobdetails .col-left {
		@apply text-slate-700;
	}
	.jobdetails .col-right {
		@apply text-slate-900;
	}
</style>
