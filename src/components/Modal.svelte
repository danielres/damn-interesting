<script lang="ts">
	import { onKey } from '$lib/onKey'
	import { onMount } from 'svelte/internal'
	import { fade } from 'svelte/transition'

	export let isOpen = false
	export const open = () => (isOpen = true)
	export const close = () => (isOpen = false)

	onMount(() => onKey('Escape', () => (isOpen = false)))
</script>

<slot {open} {close} />

{#if isOpen}
	<div class="card modal p-6" transition:fade>
		<button class="close" on:click={close}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-5 w-5"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
		<slot name="content" />
	</div>

	<div class="backdrop" transition:fade on:click={() => (isOpen = false)} />
{/if}

<style lang="postcss">
	.modal {
		@apply absolute top-16 z-20 mx-auto max-w-xl  md:w-2/3;
	}

	button.close {
		@apply rounded-full bg-black bg-opacity-0 p-1 hover:bg-opacity-20;
		@apply absolute top-3 right-3 opacity-70 transition-opacity hover:opacity-100;
	}

	.backdrop {
		@apply fixed top-0 left-0 z-10 min-h-screen min-w-full cursor-pointer py-16;
		@apply bg-black/50 backdrop-blur;
	}
</style>
