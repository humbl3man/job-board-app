<script lang="ts">
	import { page } from '$app/stores';
	import { auth } from '$lib/auth';
	import { Alert, Badge, Button, Skeleton } from '@svelteuidev/core';
	import { InfoCircled } from 'radix-icons-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const returnURL = `/jobs/${$page.params.id}`;
	const numberFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
</script>

<div class="mx-auto max-w-4xl p-8 my-16 bg-white">
	<h1 class="text-3xl">{data.detail?.title}</h1>
	<p>{data.detail?.company}</p>
	{#if data.detail?.skills}
		<div class="my-6">
			{#each data.detail.skills as skill}
				<Badge
					radius="lg"
					size="lg"
					variant="light"
					color="blue"
					class="capitalize mr-2">{skill}</Badge
				>
			{/each}
		</div>
	{/if}
	<div class="my-6">
		<h2 class="text-2xl mb-4">Description</h2>
		<p>{data.detail?.description}</p>
	</div>
	<div class="my-6">
		<h2 class="text-2xl mb-4">Expectations</h2>
		<p>{data.detail?.expectations}</p>
	</div>
	{#if data?.detail?.salary}
		<div class="my-6">
			<h2 class="text-2xl mb-4">Salary</h2>
			<p>{numberFormatter.format(data.detail.salary)} (DOE)</p>
		</div>
	{/if}

	<div class="my-6">
		{#if typeof $auth !== 'undefined'}
			{#if $auth}
				<Button
					color="red"
					size="md"
					variant="filled">Apply</Button
				>
			{:else}
				<Alert
					icon={InfoCircled}
					title="NOTE"
				>
					You must be logged in to apply. Please <a
						href="/login?returnURL={returnURL}"
						class="font-bold underline">Login</a
					>
					or
					<a
						href="/register?returnURL={returnURL}"
						class="font-bold underline">Create Account</a
					>
				</Alert>
			{/if}
		{:else}
			<div class="w-[100px]">
				<Skeleton
					height={50}
					animate
				/>
			</div>
		{/if}
	</div>
</div>
