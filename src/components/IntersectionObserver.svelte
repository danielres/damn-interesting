<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'

	let _class = ''
	export { _class as class }

	let div: HTMLElement
	let isIntersecting = false

	const dispatch = createEventDispatcher()
	$: if (isIntersecting) dispatch('intersecting')

	let viewportHeight = 700 // temporary init value
	const updateViewportHeight = () => (viewportHeight = window.innerHeight)

	onMount(() => {
		updateViewportHeight()
		const observer = new IntersectionObserver(
			(items) => (isIntersecting = items[0].isIntersecting),
			{ rootMargin: `${viewportHeight * 3}px` }
		)
		observer.observe(div)
		return () => {
			observer.disconnect()
		}
	})
</script>

<svelte:window on:resize={updateViewportHeight} />

<div class={_class} bind:this={div}>
	<slot />
</div>
