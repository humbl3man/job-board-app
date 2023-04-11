<script lang="ts">
	import Typeahead from 'svelte-typeahead';
	import { APP_NAME } from '$lib/meta';
	import { goto } from '$app/navigation';
	import { MagnifyingGlass } from 'radix-icons-svelte';

	export let data;
</script>

<!-- <pre>
	{JSON.stringify(data.jobs, null, 2)}
</pre> -->

<svelte:head>
	<title>{APP_NAME}</title>
</svelte:head>

<div class="flex h-full bg-white py-10 md:items-center lg:py-24">
	<div class="mx-auto max-w-screen-xl px-4">
		<div class="grid gap-8 md:grid-cols-2 md:gap-12">
			<div>
				<h1
					class="mb-8 text-[36px] font-extrabold leading-none tracking-tight text-indigo-900 sm:text-[42px] md:text-[70px] xl:text-[90px]"
				>
					Discover your next career move with us.
				</h1>
				<p class="text-slate-600 md:text-[20px]">
					Take the next step in your career. Browse job openings, create a profile, and apply with
					ease!
				</p>
				<div class="relative mt-8">
					<Typeahead
						type="text"
						label="Search"
						placeholder="Search for jobs..."
						hideLabel
						data={data.jobs}
						extract={(job) => job.title}
						let:result
						let:value
						on:select={({ detail }) => {
							goto(`/jobs/${detail.original.id}`);
						}}
					>
						<strong class="mr-1">{result.original.title}</strong>
						<span class="text-sm text-slate-700">{result.original.company.name}</span>
						<svelte:fragment slot="no-results">
							No results found for <span class="italic">"{value}"</span>
						</svelte:fragment>
					</Typeahead>
					<div class="absolute top-1/2 right-2 -translate-y-[50%]">
						<MagnifyingGlass size={24} />
					</div>
				</div>
			</div>
			<div class="flex justify-center">
				<img
					src="/landing-illustration.svg"
					alt=""
				/>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	:global([data-svelte-search] input) {
		@apply input-primary input w-full border-2 !important;
	}
	:global([data-svelte-typeahead]) {
		@apply block w-full !important;
	}
	:global([data-svelte-typeahead] li) {
		@apply bg-white text-slate-800;
	}
	:global([data-svelte-typeahead] li.selected),
	:global([data-svelte-typeahead] li.selected:hover),
	:global([data-svelte-typeahead] li.selected:focus) {
		@apply bg-indigo-50 text-indigo-800 !important;
	}
</style>
