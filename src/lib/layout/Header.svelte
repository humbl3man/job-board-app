<script lang="ts">
	import { APP_NAME } from '$lib/meta';
</script>

<header class="bg-white border-b border-slate-300">
	<div class="mx-auto max-w-screen-2xl py-4">
		<div class="flex items-center justify-between">
			<a
				href="/"
				class="uppercase font-bold text-2xl">{APP_NAME}</a
			>
			<nav>
				<a href="/jobs">Jobs</a>
			</nav>
			<div>
				<a href="/login">Login</a>
			</div>
		</div>
	</div>
</header>
