<script>
	import { page } from '$app/stores';
</script>

<h1>Dashboard</h1>
<pre>
  {JSON.stringify($page.data.user, null, 2)}
</pre>
