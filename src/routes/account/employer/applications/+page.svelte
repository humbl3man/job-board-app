<script lang="ts">
	import { formatDate } from '$lib/utils/formatDate.js';

	export let data;
	$: applications = data.applications;
</script>

<h1 class="mb-2 text-2xl">Review Applications</h1>

<section class="mt-10 grid gap-4">
	{#each applications as application (application.id)}
		<div
			class="ring-slate-500/4 grid gap-4 bg-white p-4 text-slate-600 shadow-sm ring-1 ring-slate-800/5 sm:grid-cols-2"
		>
			<div>
				<div class="mb-1">
					Applicant: <strong>{application.user.firstName} {application.user.lastName}</strong>
				</div>
				<div class="text-sm">
					Applying for <a
						class="font-bold text-indigo-600"
						href="/jobs/{application.job.id}">{application.job.title}</a
					>
					in {application.job.location}
				</div>
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
		<div>You don't have any applications to review</div>
	{/each}
</section>
