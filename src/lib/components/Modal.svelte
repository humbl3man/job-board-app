<script lang="ts">
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription
	} from '@rgossiaux/svelte-headlessui';

	export let open = false;
</script>

<Dialog
	class="fixed inset-0 w-full h-full z-10 flex items-center justify-center"
	{open}
	on:close
>
	<DialogOverlay class="absolute backdrop-blur-sm bg-white/40 inset-0 w-full h-full z-20" />
	<div class="bg-white p-10 relative z-50 ring-2 ring-slate-900/5 shadow-lg rounded-md max-w-lg">
		<DialogTitle class="mb-2 text-lg"><slot name="title" /></DialogTitle>
		<DialogDescription>
			<slot name="body" />
			<div class="grid grid-flow-col gap-4 justify-end mt-10">
				<slot name="footer" />
			</div>
		</DialogDescription>
	</div>
</Dialog>
