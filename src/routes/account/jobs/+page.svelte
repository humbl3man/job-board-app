<script lang="ts">
	import { page } from '$app/stores';
	import { formatDate } from '$lib/utils/formatDate';
	import { ChevronRight } from 'radix-icons-svelte';

	export let data;
</script>

<h1 class="mb-8 text-2xl">Created Jobs</h1>

<section>
	{#each data.createdJobs as job (job.id)}
		<div
			class="flex items-center justify-between border-b border-slate-300 px-4 py-6 last-of-type:border-0 "
		>
			<div>
				<div class="text-slate-500">
					<span class="font-bold text-indigo-600">{job.title}</span>
					<span class="text-sm text-slate-500">in {job.category.name}</span>
					<div>
						<a
							href="/jobs/{job.id}?returnUrl={$page.url.pathname}"
							class="link inline-flex items-center">Details <ChevronRight /></a
						>
					</div>
				</div>
			</div>
			<div class="flex flex-col items-end text-right">
				<div class="w-max rounded-lg bg-green-50 px-2 py-1 text-xs font-bold text-green-900">
					{job.type.name}
				</div>
				<div class="mt-1 text-xs text-slate-500">
					Posted on {formatDate(job.createdAt)}
				</div>
				<div class="mt-1 text-xs text-slate-500">
					Updated on {formatDate(job.updatedAt)}
				</div>
			</div>
		</div>
	{:else}
		<div>You didn't create any jobs.</div>
	{/each}
</section>
