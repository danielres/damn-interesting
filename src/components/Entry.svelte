<script lang="ts">
	import type { EntryView } from '$types'

	import { format } from '$lib/date'

	export let entry: EntryView

	export let mode: 'thumbnail' | 'view' = 'view'
</script>

<div class="grid gap-4">
	<h3>
		<div>
			{entry.title}
		</div>
		<div class="text-sm opacity-50">
			<a class="hover:underline" href={entry.authorUrl} target="_BLANK">
				{entry.authorName}
			</a>
		</div>
	</h3>

	{#if mode === 'thumbnail'}
		<a href={`/entries/${entry.id}`} class="opacity-70 hover:opacity-100">
			<img
				src={entry.thumbnailUrl}
				alt=""
				class="w-full rounded-lg border-4 border-slate-600 hover:border-slate-400 transition-all hover:shadow-lg"
				style={`aspect-ratio: ${entry.width} / ${entry.height}`}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			/>
		</a>
	{/if}

	{#if mode === 'view'}
		<iframe
			class="w-full rounded-lg border-4 border-slate-600"
			style={`aspect-ratio: ${entry.width} / ${entry.height}`}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
			frameborder="0"
			src={`https://www.youtube.com/embed/${entry.id}?feature=oembed`}
			title="Top 10 Knots To Know"
		/>
	{/if}

	<hr class="border-black/10 mt-2" />

	<div class="head">
		<span class="created-at">{format(entry.createdAt)}</span>
		<span class="owner">
			<a href={`/user/${entry.owner.slug}`}>
				{entry.owner.username}
			</a>
		</span>
	</div>

	<div class="max-h-24 overflow-y-auto text-sm">{entry.description}</div>
</div>

<style lang="postcss">
	.head {
		text-align: right;
	}
	.head span {
		padding: 0.125rem 0.25rem;
	}

	.head .created-at {
		@apply text-sm;
		color: rgba(0, 0, 0, 0.384);
	}

	.head .owner {
		background: rgba(0, 0, 0, 0.082);
	}

	h3 {
		text-shadow: 0px 2px 0px black;
	}
</style>
