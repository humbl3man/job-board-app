<script lang="ts">

	import { fly } from "svelte/transition";

</script>
<div in:fly={{ y: 50, duration: 200 }}>
  <slot />
</div>