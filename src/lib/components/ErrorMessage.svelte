<script lang="ts">
	import { ExclamationTriangle } from 'radix-icons-svelte';
</script>

<div
	class="text-red-900 border border-red-100 bg-red-50 py-2 px-3 rounded-md w-max flex items-center"
>
	<ExclamationTriangle size={32} />
	<span class="ml-3">
		<slot>[Error message was not specified.]</slot>
	</span>
</div>
