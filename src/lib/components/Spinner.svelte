<script lang="ts">
	export let width = 20;
	export let height = 20;
</script>

<div class="spinner h-[{width}px] w-[{height}px]">
	<div class="double-bounce1" />
	<div class="double-bounce2" />
</div>

<style lang="postcss">
	@keyframes spin {
		0% {
			transform: rotate(0);
		}
		50% {
			transform: rotate(360deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}
	.spinner {
		position: relative;
	}

	.double-bounce1,
	.double-bounce2 {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		opacity: 0.6;
		position: absolute;
		top: 0;
		left: 0;
		animation: sk-bounce 2s infinite ease-in-out;
		@apply bg-indigo-100;
	}

	.double-bounce2 {
		-webkit-animation-delay: -1s;
		animation-delay: -1s;
	}

	@-webkit-keyframes sk-bounce {
		0%,
		100% {
			-webkit-transform: scale(0);
		}
		50% {
			-webkit-transform: scale(1);
		}
	}

	@keyframes sk-bounce {
		0%,
		100% {
			transform: scale(0);
		}
		50% {
			transform: scale(1);
		}
	}
</style>
