<script>
	import JobHuntIllustration from '$lib/assets/JobHuntIllustration.svelte';
	import { APP_NAME } from '$lib/meta';
</script>

<svelte:head>
	<title>{APP_NAME}</title>
</svelte:head>

<div class="py-10 lg:py-14">
	<div class="mx-auto max-w-lg md:max-w-screen-xl px-4">
		<div class="grid gap-8 md:gap-12 md:grid-cols-2 items-center">
			<div>
				<h1
					class="text-[36px] md:text-[52px] xl:text-[72px] leading-none text-indigo-900 mb-8 font-serif"
				>
					Discover your next career move with us.
				</h1>
				<p class="md:text-[20px] text-slate-600">
					Take the next step in your career. Browse job openings, create a profile, and apply with
					ease!
				</p>
			</div>
			<div class="hidden justify-center md:flex">
				<svelte:component this={JobHuntIllustration} />
			</div>
		</div>
	</div>
</div>
