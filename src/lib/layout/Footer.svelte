<script>
	import { APP_NAME } from '$lib/meta';
	let copyRightYear = new Date().getFullYear();
</script>

<footer class="py-6 text-neutral bg-slate-100 border-t border-slate-200">
	<div class="mx-auto max-w-screen-xl px-2">
		<div class="text-center text-sm">{copyRightYear}&nbsp;{APP_NAME}</div>
		<div class="text-center">
			<a
				href="https://storyset.com/job"
				class="text-xs"
				target="_blank"
				rel="noreferrer noopener">Job illustrations by Storyset</a
			>
		</div>
	</div>
</footer>
