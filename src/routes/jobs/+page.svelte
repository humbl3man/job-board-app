<script lang="ts">
	import Shell from '$lib/components/Shell.svelte';
	import { APP_NAME } from '$lib/meta';
	import { formatCurrency } from '$lib/utils/formatCurrency';
	import { MagnifyingGlass, PlusCircled } from 'radix-icons-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let initialJobs = data.jobs.map((job) => {
		return {
			...job,
			search: `${job.title} ${job.category.name} ${job.company.name}`
		};
	});
	let jobs = [...initialJobs];
	let filter = 'all';
	let showFilter = !!data.user;
	let searchTerm = '';

	function applyOnlyMyJobsFilter() {
		searchTerm = '';
		jobs = jobs.filter((j) => j.company.id === data.user.companyId);
		filter = 'own';
	}
	function applyAllFilter() {
		searchTerm = '';
		jobs = [...initialJobs];
		filter = 'all';
	}

	function fuzzySearch(query: string, data: any[]) {
		// Split the search query into individual terms
		const terms = query.toLowerCase().split(' ');

		// Filter the data based on whether each term matches any part of the search key
		const result = data.filter((item) => {
			const searchKey = item.search.trim().toLowerCase();
			const regexString = terms
				.map((term) => `\\b${term.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}.*`)
				.join('');
			const regex = new RegExp(regexString);
			return regex.test(searchKey);
		});
		return result;
	}

	$: {
		if (searchTerm.trim() === '') {
			jobs = [...initialJobs];
		} else {
			jobs = [...fuzzySearch(searchTerm, initialJobs)];
		}
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

<Shell>
	<div class="mx-auto max-w-screen-2xl my-16 bg-white px-6 py-16 rounded-md">
		<h1 class="font-bold text-3xl mb-8">Job Listings</h1>

		{#if data.jobs.length}
			<div class="mb-6">
				<label
					for="search"
					class="sr-only"
				/>
				<div class="relative w-full md:w-6/12">
					<input
						id="search"
						class="input input-primary w-full pr-16"
						bind:value={searchTerm}
						type="text"
						placeholder="Search Jobs..."
					/>
					<div class="absolute top-2/4 right-2 -z-1 -translate-y-[50%]">
						<MagnifyingGlass size={24} />
					</div>
				</div>
			</div>
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
								class="btn btn-primary btn-sm gap-2"
							>
								Add Job
								<PlusCircled size={20} />
							</a>
						</div>
					{/if}
				</header>
				{#if jobs.length}
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
											class="btn btn-ghost capitalize"
											href="/jobs/{job.id}">Details</a
										></td
									>
								</tr>
							{/each}
						</tbody>
					</table>
				{:else}
					<div class="px-4 min-h-[100px] flex items-center justify-center border-2 border-dashed">
						No jobs found. Try refining your search.
					</div>
				{/if}
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
