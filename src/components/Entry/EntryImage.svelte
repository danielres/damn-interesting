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
		<div class="absolute right-1 bottom-1 rounded-tl-lg rounded-br bg-slate-600 px-2 pt-1 text-sm ">
			{formatDuration(duration)}
		</div>
	{/if}
</div>
