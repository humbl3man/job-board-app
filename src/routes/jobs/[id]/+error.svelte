<script lang="ts">
	import { page } from '$app/stores';
	import EmptyMessage from '$lib/components/EmptyMessage.svelte';
	import { ChevronRight } from 'radix-icons-svelte';
	import type { PageData } from './$types';
</script>

<div class="mx-auto max-w-lg my-16">
	<EmptyMessage>
		<div>
			<p class="text-xl font-bold text-center mb-5">We could not find this job.</p>
			<div class="flex justify-center">
				<a
					class="btn btn-primary"
					href="/jobs">Explore jobs <ChevronRight /></a
				>
			</div>
		</div>
	</EmptyMessage>
</div>
