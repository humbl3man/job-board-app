<script lang="ts">
	import Shell from '$lib/components/Shell.svelte';
	import { APP_NAME } from '$lib/meta';
	import { formatCurrency } from '$lib/utils/formatCurrency';
	import type { PageData } from './$types';

	export let data: PageData;

	let jobs = [...data.jobs];
	let filter = 'all';
	let showFilter = !!data.user;

	function applyOnlyMyJobsFilter() {
		jobs = jobs.filter((j) => j.company.id === data.user.companyId);
		filter = 'own';
	}
	function applyAllFilter() {
		jobs = [...data.jobs];
		filter = 'all';
	}

	$: {
		if (data.user?.companyId) {
			jobs = jobs.sort((j) => {
				if (j.company.id === data.user.companyId) return -1;
				return 1;
			});
		}
	}
</script>

<svelte:head>
	<title>{APP_NAME} | Job Search</title>
</svelte:head>

<!-- <pre>
	{JSON.stringify(data, null, 2)}
</pre> -->

<Shell>
	<div class="mx-auto max-w-screen-2xl my-16 bg-white px-6 py-16 rounded-md">
		<h1 class="font-bold text-3xl mb-8">Job Listings</h1>

		{#if data.jobs.length}
			<section>
				<header class="flex justify-between items-center">
					{#if showFilter}
						<div class="filters">
							<button
								class={filter === 'all' ? 'selected' : ''}
								type="button"
								on:click={applyAllFilter}>Show all</button
							>
							{#if data?.user?.companyId}
								<button
									class={filter === 'own' ? 'selected' : ''}
									type="button"
									on:click={applyOnlyMyJobsFilter}>Show my jobs</button
								>
							{/if}
						</div>
					{/if}
					{#if data.user?.company}
						<div class="mb-6 flex sm:justify-center">
							<a
								href="/jobs/create"
								class="button text-center">Add Job</a
							>
						</div>
					{/if}
				</header>
				<table class="w-full text-sm text-left text-gray-500">
					<thead class="bg-gray-50">
						<tr>
							<th
								scope="col"
								class="px-6 py-3">Title</th
							>
							<th
								scope="col"
								class="px-6 py-3">Company</th
							>
							<th
								scope="col"
								class="px-6 py-3">Salary</th
							>
							<th
								scope="col"
								class="px-6 py-3">Category</th
							>
							<th
								scope="col"
								class="px-6 py-3"
							>
								Date Posted
							</th>
							<th scope="col" />
						</tr>
					</thead>

					<tbody>
						{#each jobs as job (job.id)}
							<tr class="bg-white border-b">
								<td class="px-6 py-4">
									<div>{job.title}</div>
									{#if job.company.name === data.user?.company}
										<div
											class="mt-1 inline-block text-xs rounded-lg py-[4px] px-[12px] leading-none bg-indigo-50 text-indigo-800"
										>
											Posted by you
										</div>
									{/if}
								</td>
								<td class="px-6 py-4">{job.company.name}</td>
								<td class="px-6 py-4">{formatCurrency(job.salary)}</td>
								<td class="px-6 py-4">{job.category.name}</td>
								<td class="px-6 py-4">{new Date(job.createdAt).toLocaleDateString('en-us')}</td>
								<td class="px-6 py-4"
									><a
										class="button-ghost block text-center w-full"
										href="/jobs/{job.id}">Details</a
									></td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			</section>
		{:else}
			<p>There are no jobs to display.</p>
		{/if}
	</div>
</Shell>

<style lang="postcss">
	.filters {
		@apply mb-6;
	}
	.filters button {
		@apply px-3 py-1 text-sm text-indigo-900 rounded-lg;
	}
	.filters button.selected {
		@apply bg-indigo-50;
	}
</style>
