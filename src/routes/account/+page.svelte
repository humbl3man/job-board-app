<script lang="ts">
	import { Role } from '$lib/constants/Role';

	export let data;
</script>

<!-- <pre>
	{JSON.stringify(data, null, 2)}
</pre> -->

<section class="dashboard">
	<div class="mb-6 pb-6 border-b border-slate-300">
		<h1 class="text-2xl mb-2">Account Information</h1>
	</div>
	<div class="row">
		<div class="col-left">Email Address</div>
		<div class="col-right">
			{data.user.email}
		</div>
	</div>
	{#if data.user.role === Role.USER}
		<div class="row">
			<div class="col-left">First Name</div>
			<div class="col-right">
				{data.user.firstName ?? '[Not Set]'}
			</div>
		</div>
		<div class="row">
			<div class="col-left">Last Name</div>
			<div class="col-right">
				{data.user.lastName ?? '[Not Set]'}
			</div>
		</div>
	{/if}
	{#if data.user.role === Role.EMPLOYER}
		<div class="row">
			<div class="col-left">Company Name</div>
			<div class="col-right">
				{data.user.company}
			</div>
		</div>
	{/if}
	<div class="row">
		<div class="col-left" />
		<div class="col-right flex justify-end">
			<a
				href="/account/update"
				class="btn btn-primary btn-wide">Edit Profile</a
			>
		</div>
	</div>
</section>

<style lang="postcss">
	.dashboard .row {
		@apply py-6 border-b border-slate-300 grid gap-4 sm:gap-8 items-center sm:grid-cols-[200px_1fr] last-of-type:border-0;
	}
	.dashboard .col-left {
		@apply text-slate-500;
	}
	.dashboard .col-right {
		@apply text-slate-900;
	}
</style>
