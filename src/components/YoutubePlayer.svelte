<script lang="ts">
	import type { YouTubePlayer as TYoutubePlayer } from 'youtube-player/dist/types'

	import { onMount } from 'svelte'
	import YouTubePlayer from 'youtube-player'

	export let id: string | undefined

	let _class = ''
	export { _class as class }

	let player: TYoutubePlayer | undefined

	onMount(() => {
		player = YouTubePlayer(`player`)
	})

	$: if (player && id) player.loadVideoById(id)
</script>

<div id="player" class={_class} />
