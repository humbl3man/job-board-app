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
	import Shell from '$lib/components/Shell.svelte';
	import { ChevronLeft } from 'radix-icons-svelte';

	export let data: PageData;
	let showDeleteConfirmation = false;
	let deleteform: HTMLFormElement;
	function getdeleteform(el: HTMLFormElement) {
		deleteform = el;
	}
</script>

<!-- <pre>
	{JSON.stringify(data, null, 2)}
</pre> -->

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

<Shell>
	<div class="jobdetails mx-auto max-w-3xl bg-white mt-16 mb-16">
		<div class="p-6 border-b border-slate-300">
			<div class="mb-8">
				<a
					href="/jobs"
					class="px-4 py-1 border border-indigo-200 bg-indigo-50 text-indigo-800 rounded-lg inline-flex items-center
					"
				>
					<ChevronLeft /> Back</a
				>
			</div>
			<h1 class="text-2xl mb-2 flex items-start">
				{data.jobDetails.title}
				{#if data.user?.companyId === data.jobDetails.company.id}
					<div class="ml-2 px-2 py-1 w-max text-xs bg-indigo-50 text-indigo-800 rounded-md">
						Posted by you
					</div>
				{/if}
			</h1>
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
			<div class="col-right flex">
				{#if data.showEditButton}
					<a
						class="button-ghost mr-2"
						href="/jobs/update/{data.jobId}">Edit</a
					>
				{/if}
				{#if data.showDeleteButton}
					<form
						method="POST"
						action="?/deletejob"
						use:getdeleteform
						use:enhance={({ form, data }) => {
							return async ({ result }) => {
								await invalidateAll();
								await applyAction(result);
							};
						}}
					>
						<button
							type="button"
							class="button-ghost"
							on:click={() => (showDeleteConfirmation = true)}>Delete Job</button
						>
					</form>
				{/if}
				{#if data.showApplyButton}
					<a
						href="/jobs/{data.jobId}/apply"
						class="button">Apply for this job</a
					>
				{/if}
			</div>
		</div>
	</div>
</Shell>

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
