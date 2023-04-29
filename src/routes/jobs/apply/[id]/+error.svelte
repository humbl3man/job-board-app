<script lang="ts">
	import { page } from '$app/stores';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
</script>

<SuperDebug data={$page} />

{#if $page.status === 404}
	<div class="my-24 mx-auto max-w-sm text-center">
		<h1 class="mb-4">Job not found</h1>
		<img
			class="mx-auto block w-full"
			src="/404.svg"
			width="225"
			height="150"
			alt="Not Found"
		/>
		<p>
			We're sorry, but the job you are looking for could not be found. It's possible that the job
			has been filled, removed, or never existed in the first place.
		</p>
		<a
			href="/jobs"
			class="btn-primary btn-wide btn mt-8">See all jobs</a
		>
	</div>
{:else if $page.status === 401}
	<div class="my-24 mx-auto max-w-sm text-center">
		<h1 class="mb-4">Application not allowed</h1>

		<p>
			{$page.error?.message}
		</p>
		<a
			href="/account/user/resume"
			class="btn-primary btn-wide btn mt-8">Add Resume URL</a
		>
	</div>
{/if}
