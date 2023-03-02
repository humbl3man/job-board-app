<script>
	import { APP_NAME } from '$lib/meta';
	let copyrightYear = new Date().getFullYear();
</script>

<footer class="py-6 bg-white">
	<div class="mx-auto max-w-screen-xl px-2">
		<div class="text-center text-sm text-gray-700">{copyrightYear}&nbsp;{APP_NAME}</div>
		<div class="text-center">
			<a
				href="https://storyset.com/job"
				class="text-xs text-gray-500"
				target="_blank"
				rel="noreferrer noopener">Job illustrations by Storyset</a
			>
		</div>
	</div>
</footer>
