<script lang="ts">
	import type { EntryView } from '$types'

	import { format } from '$lib/date'

	export let entry: EntryView

	export let mode: 'thumbnail' | 'view' = 'view'
</script>

<div class="flex flex-col h-full space-y-4">
	<h3 class="drop-shadow-sharp flex-grow">
		<div>
			{entry.title}
		</div>
		<div class="text-sm opacity-50">
			<a class="underline-offset-4 hover:underline" href={entry.authorUrl} rel="external">
				{entry.authorName}
			</a>
		</div>
	</h3>

	{#if mode === 'thumbnail'}
		<a href="/entries/{entry.id}" class="opacity-70 hover:opacity-100" data-sveltekit-prefetch>
			<img
				src={entry.thumbnailUrl}
				alt={entry.title}
				class="w-full rounded-lg border-4 border-slate-600 hover:border-slate-400 transition-all hover:shadow-lg object-cover aspect-video"
			/>
		</a>
	{/if}

	{#if mode === 'view'}
		<iframe
			class="w-full rounded-lg border-4 border-slate-600"
			allowfullscreen
			frameborder="0"
			src="https://www.youtube.com/embed/{entry.id}?feature=oembed"
			title="Top 10 Knots To Know"
		/>
	{/if}

	<div class="grid gap-2">
		<div class="flex items-baseline space-x-4">
			<span class="ml-auto text-sm opacity-50">{format(entry.createdAt)}</span>
			<span class="mx-4">
				<a href="/user/{entry.owner.slug}" class="hover:underline underline-offset-4">
					{entry.owner.username}
				</a>
			</span>
		</div>

		<div class="fade-bottom h-20 overflow-y-hidden text-sm">
			{#each entry.description.split('\n') as paragraph}
				<p>{paragraph}</p>
			{/each}
		</div>
	</div>
</div>
