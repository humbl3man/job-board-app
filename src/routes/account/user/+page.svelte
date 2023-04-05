<script lang="ts">
	import { getEmploymentStatus } from '$lib/utils/getEmploymentStatus';
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
	<div class="row">
		<div class="col-left">Email Address</div>
		<div class="col-right">
			{accountData?.email ?? '[Not Set]'}
		</div>
	</div>

	{#if accountData?.firstName}
		<div class="row">
			<div class="col-left">First Name</div>
			<div class="col-right">
				{accountData.firstName}
			</div>
		</div>
	{/if}
	{#if accountData?.lastName}
		<div class="row">
			<div class="col-left">Last Name</div>
			<div class="col-right">
				{accountData.lastName}
			</div>
		</div>
	{/if}
	{#if accountData?.bio}
		<div class="row">
			<div class="col-left">Bio</div>
			<div class="col-right">
				{@html accountData.bio}
			</div>
		</div>
	{/if}
	<div class="row">
		<div class="col-left">Employment Status</div>
		<div class="col-right">
			{getEmploymentStatus(accountData?.employmentStatusId)}
		</div>
	</div>
	<div class="row">
		<div class="col-left" />
		<div class="col-right flex justify-end">
			<a
				href="/account/user/update"
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
