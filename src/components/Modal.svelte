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
		@apply fixed z-20 mx-auto max-w-xl md:w-2/3;
	}

	.backdrop {
		@apply fixed top-0 left-0 z-10 min-h-screen min-w-full cursor-pointer py-16;
		@apply bg-black/50 backdrop-blur;
	}
</style>
