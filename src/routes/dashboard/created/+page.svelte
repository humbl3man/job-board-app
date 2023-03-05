<script lang="ts">
	import { db } from '$lib/firebase/db';
	import { user } from '$lib/user';
	import { collection, getDocs, query, where, type DocumentData } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let isLoading = true;
	let jobs: any[] = [];

	onMount(async () => {
		const q = query(collection(db, 'jobs'), where('company', '==', $user.companyName));
		const snapshot = await getDocs(q);
		const createdJobs: DocumentData[] = [];
		snapshot.forEach((doc) => {
			console.log(doc.data(), doc.id);
			createdJobs.push(doc.data());
		});
		jobs = createdJobs;
		isLoading = false;
	});
</script>

<h1>Created Jobs</h1>
{#if isLoading}
	<p>Loading...</p>
{:else}
	{#each jobs as { title }}
		<div>{title}</div>
	{:else}
		<div>No jobs created...</div>
	{/each}
{/if}
