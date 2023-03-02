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
				<article class="grid p-4 border-b-2 border-slate-200 bg-white job-post">
					<div>
						<div class="text-indigo-900 font-bold text-lg">{title}</div>
						<div class="text-slate-700">{category}</div>
					</div>
					<div class="flex skill-list justify-end">
						{#each skills as skill}
							<Badge
								radius="sm"
								size="sm"
								variant="light"
								color="indigo"
								class="capitalize mr-2">{skill}</Badge
							>
						{/each}
					</div>
				</article>
			</a>
		{/each}
	</section>
</div>

<style>
	@media screen and (min-width: 767px) {
		.job-post {
			grid-template-columns: 2fr 1fr;
		}
	}
</style>
