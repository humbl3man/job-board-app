<script lang="ts">
	import { InfoCircled } from 'radix-icons-svelte';

	export let label: string = '';
</script>

<label
	class="label"
	for={label}
>
	<span class="label-text-alt text-red-600">
		<slot>[Validation Error Message is required]</slot>
	</span>
</label>
