<script lang="ts">
	import { formatDuration } from '$lib/time'

	export let duration: number | null | undefined
	export let thumbnailUrl: string
	export let title: string
</script>

<div class="relative">
	<img
		src={thumbnailUrl}
		alt={title}
		class="aspect-video w-full rounded-lg border-4 border-slate-600 object-cover transition-all hover:border-slate-400 hover:shadow-lg "
	/>

	{#if duration}
		<div
			class="absolute right-0 bottom-0 rounded-tl-lg rounded-br-lg bg-slate-600 px-2 py-1 text-sm "
		>
			{formatDuration(duration)}
		</div>
	{/if}
</div>
