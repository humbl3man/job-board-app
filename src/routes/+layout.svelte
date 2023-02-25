<script>
	import Footer from '$lib/layout/Footer.svelte';
	import Header from '$lib/layout/Header.svelte';
	import '../app.css';
</script>

<Header />
<main><slot /></main>
<Footer />
