<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription
	} from '@rgossiaux/svelte-headlessui';
	import { formatCurrency } from '$lib/utils/formatCurrency';
	import type { PageData } from './$types';
	import Shell from '$lib/components/Shell.svelte';
	import { ChevronLeft, ChevronRight, Circle, InfoCircled } from 'radix-icons-svelte';
	import { Role } from '$lib/constants/Role';

	export let data: PageData;
	let showDeleteConfirmation = false;
	let deleteform: HTMLFormElement;
	let showLoginWarning = false;
	let returnURL = `/jobs/${data.jobId}`;
	function getdeleteform(el: HTMLFormElement) {
		deleteform = el;
	}
</script>

<!-- Delete warning -->
{#if data.user?.role === Role.EMPLOYER}
	<Dialog
		class="fixed inset-0 w-full h-full z-10 flex items-center justify-center"
		open={showDeleteConfirmation}
		on:close={() => (showDeleteConfirmation = false)}
	>
		<DialogOverlay class="absolute backdrop-blur-sm bg-white/40 inset-0 w-full h-full z-20" />
		<div class="bg-white p-10 relative z-50 border-2 border-slate-600 rounded-md max-w-md">
			<DialogTitle class="mb-2">Delete this job?</DialogTitle>
			<DialogDescription>
				<p>Are you sure you want to delete this job? This can't be undone.</p>
				<div class="grid grid-flow-col gap-4 justify-end mt-6">
					<button
						class="btn btn-sm btn-error"
						on:click={() => deleteform.submit()}>Yes, Delete it</button
					>
					<button
						class="btn btn-sm btn-ghost"
						on:click={() => (showDeleteConfirmation = false)}>Cancel</button
					>
				</div>
			</DialogDescription>
		</div>
	</Dialog>
{/if}

<!-- Login warning -->

<Dialog
	class="fixed inset-0 w-full h-full z-10 flex items-center justify-center"
	open={showLoginWarning}
	on:close={() => (showDeleteConfirmation = false)}
>
	<DialogOverlay class="absolute backdrop-blur-sm bg-white/40 inset-0 w-full h-full z-20" />
	<div class="bg-white p-10 relative z-50 border-2 border-slate-600 rounded-md max-w-lg">
		<DialogTitle class="mb-2 text-lg">Applying for {data.jobDetails.title}?</DialogTitle>
		<DialogDescription>
			<p>
				Hello and welcome to our job portal! We kindly ask that you log in to your account before
				applying for this job. If you haven't registered yet, don't worry - it only takes a moment
				to <button
					type="button"
					class="link link-primary"
					on:click={() => goto(`/register?returnUrl=${returnURL}`)}>create an account</button
				>. Please note that we won't be able to consider applications submitted without logging in.
				Thank you for your interest in this job opportunity and we can't wait to see your
				application!
			</p>
			<div class="mt-6 gap-4 flex justify-end">
				<button
					type="button"
					class="btn btn-sm btn-primary"
					on:click={() => goto(`/login/?returnURL=${returnURL}`)}>Login</button
				>
				<button
					class="btn btn-sm btn-ghost"
					on:click={() => (showLoginWarning = false)}>Close</button
				>
			</div>
		</DialogDescription>
	</div>
</Dialog>

<Shell>
	<div class="jobdetails max-w-3xl custom-wrapper">
		<div class="py-6 border-b border-slate-300">
			<div class="mb-8">
				<a
					href="/jobs"
					class="btn btn-sm btn-primary btn-outline"
				>
					<ChevronLeft /> All Jobs</a
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
			<div class="col-right flex justify-end">
				{#if data.showEditButton}
					<a
						class="btn btn-primary btn-outline mr-2"
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
							class="btn btn-error"
							on:click={() => (showDeleteConfirmation = true)}>Delete</button
						>
					</form>
				{/if}
				{#if !data.user}
					<a
						href="/login/?returnUrl=/jobs/{data.jobId}"
						on:click|preventDefault={() => {
							showLoginWarning = true;
						}}
						class="btn btn-primary">Apply for this job <ChevronRight /></a
					>
				{/if}
				{#if data.user?.role === Role.USER}
					<a
						href="/jobs/apply/{data.jobId}"
						class="btn btn-primary">Apply for this job <ChevronRight /></a
					>
				{/if}
			</div>
		</div>
	</div>
</Shell>

<style lang="postcss">
	.jobdetails .row {
		@apply py-6 border-b border-slate-300 grid gap-4 sm:gap-8 items-center sm:grid-cols-[200px_1fr] last-of-type:border-0;
	}
	.jobdetails .col-left {
		@apply text-slate-700;
	}
	.jobdetails .col-right {
		@apply text-slate-900;
	}
</style>
