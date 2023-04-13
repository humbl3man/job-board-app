<script lang="ts">
	import { formatDate } from '$lib/utils/formatDate.js';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data;
</script>

<!-- 
<SuperDebug {data} /> -->

<h1 class="mb-2 text-2xl">Applications</h1>

<section class="mt-10 grid gap-4">
	{#each data.applications as application (application.id)}
		<div
			class="ring-slate-500/4 grid gap-4 bg-white p-4 text-slate-600 shadow-sm ring-1 ring-slate-800/5 sm:grid-cols-2"
		>
			<div>
				<span class="font-bold text-indigo-800">{application.job.title}</span>
				at
				{application.job.company.name}
			</div>
			<div class="text-sm sm:text-right">
				<div class="mb-1">
					Status: <span class="inline-block rounded-md bg-slate-100 py-[2px] px-[8px] text-sm"
						>{application.status}</span
					>
				</div>
				<div>Date applied: {formatDate(application.createdAt)}</div>
			</div>
		</div>
	{:else}
		<div>You don't have any applications</div>
	{/each}
</section>
