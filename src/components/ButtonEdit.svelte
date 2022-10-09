<script lang="ts">
	import { onKey } from '$lib/onKey'
	import { onMount } from 'svelte'

	export let isEditing: boolean
	export let toggle: () => void
	export let end: () => void

	onMount(() => onKey('Escape', end))
</script>

<button
	class="mx-auto py-2 -mt-8 opacity-50 hover:opacity-100 transition-opacity"
	class:active={isEditing}
	title="Edit"
	on:click={toggle}
>
	<span class="sr-only">Edit</span>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="w-8 h-8 rounded-full p-1"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
		/>
	</svg>
</button>

<style lang="postcss">
	button.active {
		@apply opacity-70;
		svg {
			@apply bg-white stroke-slate-900 animate-pulse;
		}
	}
</style>
