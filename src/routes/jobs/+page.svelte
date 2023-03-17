<script lang="ts">
	import { APP_NAME } from '$lib/meta';
	import { Badge } from '@svelteuidev/core';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{APP_NAME} | Job Search</title>
</svelte:head>

<div class="mx-auto max-w-5xl px-4 my-16">
	<h1 class="font-bold text-3xl mb-8">Job Listings</h1>
	<section>
		{#if data.user?.company}
			<a
				href="/jobs/create"
				class="button button--sm inline-block mb-4">Create</a
			>
		{/if}
		<table class="w-full text-sm text-left text-gray-500">
			<thead class="text-xs text-gray-700 uppercase bg-gray-50">
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
					<th scope="col" />
				</tr>
			</thead>

			<tbody>
				{#each data?.jobs as job (job.id)}
					<tr class="bg-white border-b">
						<td class="px-6 py-4">{job.title}</td>
						<td class="px-6 py-4">{job.company.name}</td>
						<td class="px-6 py-4">{job.salary}</td>
						<td class="px-6 py-4">{job.category.name}</td>
						<td class="px-6 py-4"
							><a
								class="text-indigo-600 font-bold hover:underline"
								href="/jobs/{job.id}">Details</a
							></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
</div>
