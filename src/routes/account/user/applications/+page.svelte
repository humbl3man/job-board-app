<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { formatDate } from '$lib/utils/formatDate.js';

	export let data;
</script>

<h1 class="mb-2 text-2xl">Applications</h1>

<section class="mt-10 grid gap-4">
	{#each data.applications as application (application.id)}
		<div
			class="ring-slate-500/4 grid gap-4 bg-white p-4 text-slate-600 shadow-sm ring-1 ring-slate-800/5 sm:grid-cols-2"
		>
			<div>
				<a
					href="/jobs/apply/{application.job.id}"
					class="font-bold text-indigo-800">{application.job.title}</a
				>
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
				<form
					method="POST"
					action="?/withdraw"
					use:enhance={() => {
						return async ({ result }) => {
							await applyAction(result);
							await invalidateAll();
						};
					}}
				>
					<input
						type="hidden"
						name="application_id"
						value={application.id.toString()}
					/>
					<button class="btn-error btn-xs btn text-white">Withdraw Application</button>
				</form>
			</div>
		</div>
	{:else}
		<div>You don't have any applications</div>
	{/each}
</section>
