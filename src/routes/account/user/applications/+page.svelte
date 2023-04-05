<script lang="ts">
	export let data;
</script>

<h1 class="text-2xl mb-2">Applications</h1>

<!-- <pre>
  {JSON.stringify(data, null, 2)}
</pre> -->

{#each data.applications as application (application.id)}
	<ul>
		<li>Renders applications here</li>
	</ul>
{:else}
	<div>You don't have any applications</div>
{/each}
