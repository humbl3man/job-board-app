<script lang="ts">
	export let label: string = '';
</script>

<label
	class="mt-[2px]"
	for={label}
>
	<span class="label-text-alt text-red-600">
		<slot>[Validation Error Message is required]</slot>
	</span>
</label>
