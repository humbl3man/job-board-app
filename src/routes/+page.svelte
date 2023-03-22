<script lang="ts">
	import Typeahead from 'svelte-typeahead';
	import JobHuntIllustration from '$lib/assets/JobHuntIllustration.svelte';
	import { APP_NAME } from '$lib/meta';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { MagnifyingGlass } from 'radix-icons-svelte';

	export let data: PageData;
</script>

<!-- <pre>
	{JSON.stringify(data.jobs, null, 2)}
</pre> -->

<svelte:head>
	<title>{APP_NAME}</title>
</svelte:head>

<div class="py-10 lg:py-24 bg-primary">
	<div class="mx-auto max-w-screen-xl px-4">
		<div class="grid gap-8 sm:gap-12 sm:grid-cols-2">
			<div>
				<h1
					class="text-[36px] md:text-[52px] xl:text-[72px] leading-none text-indigo-900 mb-8 font-serif font-extrabold dark:text-indigo-50"
				>
					Discover your next career move with us.
				</h1>
				<p class="md:text-[20px] text-slate-600 dark:text-indigo-100">
					Take the next step in your career. Browse job openings, create a profile, and apply with
					ease!
				</p>
				<div class="mt-8 relative">
					<!-- TODO: override typeahead input to match dark theme -->
					<Typeahead
						label="Search"
						placeholder="Search for jobs..."
						hideLabel
						data={data.jobs}
						class="input input-bordered input-accent w-full"
						extract={(job) => job.title}
						let:result
						on:select={({ detail }) => {
							goto(`/jobs/${detail.original.id}`);
						}}
					>
						<strong class="mr-1">{result.original.title}</strong>
						<span class="text-sm text-slate-700">{result.original.company.name}</span>
					</Typeahead>
					<div class="absolute top-1/2 -translate-y-[50%] right-2">
						<MagnifyingGlass size={24} />
					</div>
				</div>
			</div>
			<div class="flex justify-center">
				<svelte:component this={JobHuntIllustration} />
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	/* :global([data-svelte-search] input) {
		@apply pr-8 py-3 pl-4 w-full border-0 shadow-md text-lg rounded-md focus:ring-2 focus:ring-indigo-300;
	} */
	:global([data-svelte-typeahead] li) {
		@apply bg-white text-slate-800;
	}
	:global([data-svelte-typeahead] li.selected),
	:global([data-svelte-typeahead] li.selected:hover),
	:global([data-svelte-typeahead] li.selected:focus) {
		@apply bg-indigo-50 text-indigo-800 !important;
	}
</style>
