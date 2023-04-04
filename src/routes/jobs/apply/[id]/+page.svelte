<script lang="ts">
	import Shell from '$lib/components/Shell.svelte';
	import { formatCurrency } from '$lib/utils/formatCurrency';
	export let data;
</script>

<Shell>
	<div class="custom-wrapper max-w-2xl">
		<h1>Application Details</h1>
		<div class="detail">
			{#if data.job}
				<div class="detail-row">
					<div class="detail-col desc">Title</div>
					<div class="detail-col">{data.job.title}</div>
				</div>
				<div class="detail-row">
					<div class="detail-col desc">Location</div>
					<div class="detail-col">{data.job.location}</div>
				</div>
				<div class="detail-row">
					<div class="detail-col desc">Type</div>
					<div class="detail-col">{data.job.type.name}</div>
				</div>
				{#if data.job.salary}
					<div class="detail-row">
						<div class="detail-col desc">Salary</div>
						<div class="detail-col">{formatCurrency(data.job.salary)}</div>
					</div>
				{/if}
			{/if}
		</div>
		<form>
			<div class="form-control my-4">
				<label
					for="firstname"
					class="label">First Name</label
				>
				<input
					class="input-bordered input-primary input"
					id="firstname"
					name="firstname"
					type="text"
					value={data.user.firstName ?? ''}
				/>
			</div>
		</form>
	</div>
</Shell>

<style lang="postcss">
	.detail {
		@apply my-8 border-2 border-slate-100;
	}
	.detail-row {
		@apply grid grid-cols-[100px_1fr] border-b-2 border-slate-100 last-of-type:border-b-0;
	}
	.detail-col {
		@apply p-2;
	}
	.detail-col.desc {
		@apply border-r-2 border-slate-100 bg-slate-50 p-2;
	}
</style>
