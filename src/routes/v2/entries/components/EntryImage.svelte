<script lang="ts">
	import { formatDuration } from '$lib/time'
	import { fade } from 'svelte/transition'

	export let duration: number | null | undefined
	export let thumbnailUrl: string | undefined
	export let title: string = ''
</script>

<div class="relative">
	<div class="vignette">
		{#if thumbnailUrl}
			<img
				in:fade={{ duration: 100, delay: Math.random() * 1000 }}
				src={thumbnailUrl}
				alt={title}
				class="thumbnail"
			/>
		{:else}
			<div class="thumbnail bg-slate-900" />
		{/if}
	</div>

	<div class="absolute right-0 bottom-1 -mb-1 rounded-tl-lg bg-slate-700 px-2 pt-1 pb-1.5 text-sm ">
		{#if duration}
			{formatDuration(duration)}
		{:else}
			<span class="opacity-0">00:00</span>
		{/if}
	</div>
</div>

<style lang="postcss">
	.vignette {
		/* @apply border; */
		position: relative;
		&:after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			box-shadow: inset 0px 0px 20px 20px rgba(0, 0, 0, 0.25);
		}
	}

	.thumbnail {
		@apply aspect-video w-full border-4 border-slate-600 object-cover transition-all;
	}

	:global(a:hover) .vignette:after {
		@apply opacity-0 transition-opacity;
	}
</style>
