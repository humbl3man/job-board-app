<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { formatCurrency } from '$lib/utils/formatCurrency';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

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
			<form
				method="POST"
				action="?/deletejob"
				use:enhance={({ form, data }) => {
					return async ({ result }) => {
						await invalidateAll();
						await applyAction(result);
					};
				}}
			>
				<button
					type="button"
					class="button button--sm">Update</button
				>
			</form>
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
