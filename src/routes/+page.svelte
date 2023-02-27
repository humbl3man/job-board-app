<script>
	import { APP_NAME } from '$lib/meta';
	// import heroIllustration from '$lib/assets/hero-illustration.svg';
	import JobHuntIllustration from '$lib/assets/JobHuntIllustration.svelte';
</script>

<div class="py-40">
	<div class="mx-auto max-w-7xl px-4">
		<div class="grid gap-8 md:gap-12 md:grid-cols-2 items-center">
			<div>
				<h1 class="text-[50px] lg:text-[80px] leading-none text-indigo-900 mb-8 font-serif">
					Find your Perfect Match. <br /> From Job to Career.
				</h1>
				<p class="text-[20px]">
					Are you tired of endlessly browsing through multiple job websites, only to be disappointed
					with the available options? Look no further, because {APP_NAME} is here to help you find your
					dream job.
				</p>
			</div>
			<div class="flex justify-center">
				<svelte:component this={JobHuntIllustration} />
			</div>
		</div>
	</div>
</div>
