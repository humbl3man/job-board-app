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
		{#each data.jobs as { id, title, company, category, salary, description, skills, expectations }}
			<a href="/jobs/{id}">
				<article
					class="grid p-6 border-b-2 border-slate-200 bg-white gap-4 hover:bg-slate-50 transition duration-100"
				>
					<div>
						<div class="text-indigo-700 font-bold">{title}</div>
						<div class="text-slate-700 text-sm">{company} | {category}</div>
					</div>
					<div class="flex">
						{#each skills as skill}
							<Badge
								radius="lg"
								size="md"
								variant="light"
								color="blue"
								class="capitalize mr-2">{skill}</Badge
							>
						{/each}
					</div>
				</article>
			</a>
		{/each}
	</section>
</div>
