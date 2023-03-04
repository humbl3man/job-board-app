<script>
	import { page } from '$app/stores';
</script>

<div class="mx-auto max-w-4xl p-8 my-16 bg-white">
	<h1 class="text-3xl text-center">{$page.error?.message}</h1>
</div>
