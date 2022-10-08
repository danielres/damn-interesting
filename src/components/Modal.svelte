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
	<div class="card modal" transition:fade>
		<slot name="content" />
	</div>

	<div class="backdrop" transition:fade on:click={() => (isOpen = false)} />
{/if}

<style lang="postcss">
	.modal {
		@apply fixed z-20 max-w-xl md:w-2/3 mx-auto;
	}

	.backdrop {
		@apply fixed z-10 top-0 left-0 min-w-full min-h-screen py-16 cursor-pointer;
		@apply bg-black/50 backdrop-blur;
	}
</style>
