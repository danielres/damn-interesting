<script lang="ts">
	import { debounce } from '$lib/event'

	export let vanish = true

	let y = 0
	let prevY = 0
	let hidden = false
	let deltaY = 0

	const resistance = 10

	const toggleHidden = () => {
		if (!vanish) return
		deltaY = y - prevY
		if (Math.abs(deltaY) < resistance) return
		hidden = deltaY > 0
	}

	const onScroll = () => {
		toggleHidden()
		prevY = y
	}
</script>

<svelte:window bind:scrollY={y} on:scroll={debounce(onScroll, 50)} />

<header class:hidden class="fixed top-0 w-full gap-4">
	<slot />
</header>

<style lang="postcss">
	header {
		translate: 0 0;
		transition: translate 200ms linear;
		display: block;

		&.hidden {
			translate: 0 -100%;
		}
	}
</style>
