<script lang="ts">
	import { highlight } from '$lib/html'

	export let placeholder = ''
	export let suggestions: string[] = []
	export let value: string

	let searchInput: HTMLInputElement
	let highlightIndex = -1

	const setInputVal = (val: string) => {
		value = val
		suggestions = []
		highlightIndex = -1
		searchInput.focus()
	}

	const navigateSuggestions = (e: KeyboardEvent) => {
		if (document.activeElement !== searchInput) return

		if (e.key === 'ArrowDown') e.preventDefault() // Prevents cursor moving to input start
		if (e.key === 'Enter' && highlightIndex > -1) e.preventDefault() // Prevents submitting selected immediately

		const lastIndex = suggestions.length - 1
		const next = () => (highlightIndex < lastIndex ? (highlightIndex += 1) : (highlightIndex = 0))
		const prev = () => (highlightIndex < 1 ? (highlightIndex = lastIndex) : (highlightIndex -= 1))

		if (e.key === 'Enter' && highlightIndex > -1) setInputVal(suggestions[highlightIndex])
		if (e.key === 'Escape') suggestions = []
		if (e.key === 'ArrowDown') next()
		if (e.key === 'ArrowUp') prev()
	}
</script>

<svelte:window on:keydown={navigateSuggestions} />

<div class="inline-block">
	<input
		autocomplete="off"
		type="text"
		{placeholder}
		on:click|preventDefault
		bind:this={searchInput}
		bind:value
	/>
	<div class="absolute bottom-0 left-0 w-full">
		{#if suggestions.length > 0}
			<ul class="suggestions">
				{#each suggestions as suggestion, i}
					{@const active = i === highlightIndex}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<li class:active on:click={() => setInputVal(suggestion)}>
						{@html highlight(suggestion, value, 'b')}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style lang="postcss">
	ul.suggestions {
		@apply absolute top-0 m-0 w-full overflow-hidden rounded border border-black bg-slate-800 shadow-lg;

		li {
			@apply left-0 right-0 z-50 cursor-pointer p-2 hover:bg-slate-600/50;
			&.active {
				@apply bg-slate-600/50;
			}
		}
	}
</style>
