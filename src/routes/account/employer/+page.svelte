<script lang="ts">
	import { Pencil2 } from 'radix-icons-svelte';

	export let data;
	let { accountData } = data;
</script>

<!-- <pre>
	{JSON.stringify(data, null, 2)}
</pre> -->

<section class="dashboard">
	<div class="mb-6 border-b border-slate-300 pb-6">
		<h1 class="mb-2 text-2xl">Account Information</h1>
	</div>

	{#if accountData?.email}
		<div class="row">
			<div class="col-left">Email</div>
			<div class="col-right">
				{accountData.email}
			</div>
		</div>
	{/if}
	{#if accountData?.Company?.name}
		<div class="row">
			<div class="col-left">Company Name</div>
			<div class="col-right">
				{accountData.Company.name}
			</div>
		</div>
	{/if}
	{#if accountData?.Company?.description}
		<div class="row">
			<div class="col-left">Bio</div>
			<div class="col-right">
				{@html accountData.Company.description}
			</div>
		</div>
	{/if}

	<div class="row">
		<div class="col-left" />
		<div class="col-right flex justify-end">
			<a
				href="/account/employer/update"
				class="btn-primary btn gap-2"
			>
				<Pencil2 size={20} />
				Edit
			</a>
		</div>
	</div>
</section>

<style lang="postcss">
	.dashboard .row {
		@apply grid items-center gap-4 border-b border-slate-300 py-6 last-of-type:border-0 sm:grid-cols-[200px_1fr] sm:gap-8;
	}
	.dashboard .col-left {
		@apply text-slate-500;
	}
	.dashboard .col-right {
		@apply text-slate-900;
	}
</style>
