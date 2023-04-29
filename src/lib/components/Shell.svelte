<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<div in:fly={{ y: 15, duration: 100 }}>
	<slot />
</div>
