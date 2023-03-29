<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { formatCurrency } from '$lib/utils/formatCurrency';
	import type { PageData } from './$types';
	import Shell from '$lib/components/Shell.svelte';
	import { ChevronLeft, ChevronRight, Circle, InfoCircled } from 'radix-icons-svelte';
	import { Role } from '$lib/constants/Role';
	import Modal from '$lib/components/Modal.svelte';
	import { page } from '$app/stores';

	export let data: PageData;
	let showDeleteConfirmation = false;
	let deleteform: HTMLFormElement;
	let showLoginWarning = false;
	function getdeleteform(el: HTMLFormElement) {
		deleteform = el;
	}

	let redirectToUrl: string;
	$: redirectToUrl = $page.url.pathname + $page.url.search;
</script>

<!-- Delete warning -->
{#if data.user?.role === Role.EMPLOYER}
	<Modal
		on:close={() => (showDeleteConfirmation = false)}
		open={showDeleteConfirmation}
	>
		<svelte:fragment slot="title">Delete &quot;{data.jobDetails.title}&quot;?</svelte:fragment>
		<svelte:fragment slot="body"
			><p>Are you sure you want to delete this job? This can't be undone.</p></svelte:fragment
		>
		<svelte:fragment slot="footer">
			<button
				class="btn btn-sm btn-error"
				on:click={() => deleteform.submit()}>Yes, Delete it</button
			>
			<button
				class="btn btn-sm btn-ghost"
				on:click={() => (showDeleteConfirmation = false)}>Cancel</button
			>
		</svelte:fragment>
	</Modal>
{/if}

<!-- Login warning -->
<Modal
	on:close={() => (showLoginWarning = false)}
	open={showLoginWarning}
>
	<svelte:fragment slot="title">Applying for &quot;{data.jobDetails.title}&quot;?</svelte:fragment>
	<svelte:fragment slot="body">
		<p>
			We kindly ask that you log in to your account before applying for this job. If you haven't
			registered yet, don't worry - it only takes a moment to create an account.
		</p>
	</svelte:fragment>
	<svelte:fragment slot="footer">
		<button
			type="button"
			class="btn btn-sm btn-primary"
			on:click={() => goto(`/login/?redirectTo=${redirectToUrl}`)}>Login</button
		>
		<button
			class="btn btn-sm btn-ghost"
			on:click={() => goto(`/register?redirectTo=${redirectToUrl}`)}>Create Account</button
		>
	</svelte:fragment>
</Modal>

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
						href="/login/?redirectTo={redirectToUrl}"
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
