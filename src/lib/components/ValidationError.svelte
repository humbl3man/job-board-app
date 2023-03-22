<script>
	import { InfoCircled } from 'radix-icons-svelte';
</script>

<div
	class="bg-red-50 border text-red-900 border-red-100 mt-1 flex items-center w-max py-1 px-2 rounded-md text-sm left-0 leading-none"
>
	<InfoCircled />
	<span class="ml-1">
		<slot>[Validation error message was empty.]</slot>
	</span>
</div>
