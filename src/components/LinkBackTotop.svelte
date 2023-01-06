<script lang="ts">
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import Icon from '$components/Icon.svelte'

	let scrollY = 0
	let viewportHeight = 700

	const updateValues = () => {
		scrollY = window.scrollY
		viewportHeight = window.innerHeight
	}

	onMount(updateValues)

	$: buttonVisible = scrollY > viewportHeight * 2

	const onClick = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<svelte:window on:scroll={updateValues} on:resize={updateValues} />

<div id="top" class="absolute top-0" />

{#if buttonVisible}
	<a
		transition:fade
		href="#top"
		class="fixed bottom-4 right-4 rounded-full border-2 border-slate-500 bg-slate-900 p-2 text-slate-400 shadow-xl transition-all hover:border-slate-400 hover:text-white  sm:right-10"
		on:click|preventDefault={onClick}
	>
		<Icon type="chevron-double-up" />
	</a>
{/if}
