<script lang="ts">
	import EmptyMessage from '$lib/components/EmptyMessage.svelte';
	import { Role } from '$lib/constants/Role';
	import { APP_NAME } from '$lib/meta';
	import { formatDate } from '$lib/utils/formatDate';
	import { MagnifyingGlass, PlusCircled } from 'radix-icons-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let isEmployer = data.user?.role === Role.EMPLOYER;
	let initialJobs = data.jobs.map((job) => {
		return {
			...job,
			search: `${job.title} ${job.category.name} ${job.company.name} ${job.location}`
		};
	});
	let jobs = [...initialJobs];
	let searchTerm = '';

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

<div class="custom-wrapper max-w-screen-2xl">
	<header class="mb-6 flex justify-between">
		<div>
			<h1 class="mb-2 text-2xl font-bold">Job Listings</h1>
			<p class="text-slate-600">Explore exciting job opportunities across various industries.</p>
		</div>
		{#if isEmployer}
			<a
				href="/jobs/create"
				class="btn-primary btn-sm btn gap-2"
			>
				Add Job
				<PlusCircled size={20} />
			</a>
		{/if}
	</header>

	{#if data.jobs.length}
		<div class="mb-6">
			<label
				for="search"
				class="sr-only"
			/>
			<div class="relative w-full md:w-6/12">
				<input
					id="search"
					class="input-primary input w-full pr-16"
					bind:value={searchTerm}
					type="text"
					placeholder="Search Jobs..."
				/>
				<div class="-z-1 absolute top-2/4 right-2 -translate-y-[50%]">
					<MagnifyingGlass size={24} />
				</div>
			</div>
		</div>
		<section>
			{#each jobs as job (job.id)}
				<a
					href="/jobs/{job.id}"
					class="flex items-center justify-between border-b border-slate-300 px-4 py-6 transition-colors duration-[50ms] last-of-type:border-0 hover:bg-slate-50"
				>
					<div>
						<div class="text-slate-500">
							<span class="font-bold text-indigo-600">{job.title}</span>
							<span class="text-sm text-slate-500">in {job.category.name}</span>
						</div>
						<div>
							<div class="mb-2 text-sm text-slate-600">{job.company.name}</div>
							<div class="text-sm text-slate-600">{job.location}</div>
						</div>
					</div>
					<div class="flex flex-col items-end text-right">
						<div class="w-max rounded-lg bg-green-50 px-2 py-1 text-xs font-bold text-green-900">
							{job.type.name}
						</div>
					</div>
				</a>
			{:else}
				<EmptyMessage>No jobs found. Try refining your search.</EmptyMessage>
			{/each}
		</section>
	{:else}
		<EmptyMessage>
			Currently, there are no jobs at this time. Please check back at a later time.
		</EmptyMessage>
	{/if}
</div>
