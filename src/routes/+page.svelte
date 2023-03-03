<script>
	import JobHuntIllustration from '$lib/assets/JobHuntIllustration.svelte';
	import { APP_NAME } from '$lib/meta';
	import { Button } from '@svelteuidev/core';
	import { ChevronRight } from 'radix-icons-svelte';
</script>

<svelte:head>
	<title>{APP_NAME}</title>
</svelte:head>

<div class="py-10 lg:py-14">
	<div class="mx-auto max-w-screen-xl px-4">
		<div class="grid gap-8 sm:gap-12 sm:grid-cols-2">
			<div>
				<h1
					class="text-[36px] md:text-[52px] xl:text-[72px] leading-none text-indigo-900 mb-8 font-serif font-extrabold"
				>
					Discover your next career move with us.
				</h1>
				<p class="md:text-[20px] text-slate-600">
					Take the next step in your career. Browse job openings, create a profile, and apply with
					ease!
				</p>
				<div class="mt-8">
					<Button
						href="/jobs"
						size="lg"
						class="md:max-w-xs font-bold"
						variant="gradient"
						gradient={{ from: 'grape', to: 'indigo', deg: 35 }}
						target=""
					>
						Explore Jobs
						<ChevronRight slot="rightIcon" />
					</Button>
				</div>
			</div>
			<div class="flex justify-center">
				<svelte:component this={JobHuntIllustration} />
			</div>
		</div>
	</div>
</div>
