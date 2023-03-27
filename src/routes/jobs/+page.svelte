<script lang="ts">
	import EmptyMessage from '$lib/components/EmptyMessage.svelte';
	import Shell from '$lib/components/Shell.svelte';
	import { Role } from '$lib/constants/Role';
	import { APP_NAME } from '$lib/meta';
	import { formatCurrency } from '$lib/utils/formatCurrency';
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

<Shell>
	<div class="max-w-screen-2xl custom-wrapper">
		<header class="mb-6 flex justify-between">
			<div>
				<h1 class="font-bold text-2xl mb-2">Job Listings</h1>
				<p class="text-slate-600">Explore exciting job opportunities across various industries.</p>
			</div>
			{#if isEmployer}
				<a
					href="/jobs/create"
					class="btn btn-primary btn-sm gap-2"
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
				{#each jobs as job (job.id)}
					<a
						href="/jobs/{job.id}"
						class="px-4 py-6 flex justify-between items-center border-b border-slate-300 last-of-type:border-0 hover:bg-slate-50 transition-colors duration-[50ms]"
					>
						<div>
							<div class="text-slate-500">
								<span class="font-bold text-indigo-600">{job.title}</span>
								<span class="text-slate-500 text-sm">in {job.category.name}</span>
							</div>
							<div>
								<div class="text-sm text-slate-600 mb-2">{job.company.name}</div>
								<div class="text-sm text-slate-600">{job.location}</div>
							</div>
						</div>
						<div class="text-right flex flex-col items-end">
							<div class="px-2 w-max py-1 bg-green-50 text-green-900 font-bold text-xs rounded-lg">
								{job.type.name}
							</div>
							<div class="text-slate-500 text-xs mt-1">
								Posted on {formatDate(job.createdAt)}
							</div>
							<div class="text-slate-500 text-xs mt-1">
								Updated on {formatDate(job.updatedAt)}
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
</Shell>
