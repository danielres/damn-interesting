<script lang="ts">
	import type { EntryView } from '../db/types'
	export let entry: EntryView

	const WIDTH = 500
	const ratio = entry.width / entry.height
</script>

<div class="my-12">
	<div class="owner">
		<span>
			<a href={`/user/${entry.owner.slug}`}>
				{entry.owner.username}
			</a>
		</span>
	</div>
	<h3 class="flex items-baseline justify-between">
		<div class="title opacity-75">
			{entry.title}
		</div>
		<div class="text-sm opacity-50">
			<a class="hover:underline" href={entry.authorUrl} target="_BLANK">
				{entry.authorName}
			</a>
		</div>
	</h3>
	<iframe
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
		frameborder="0"
		height={WIDTH / ratio}
		src={`https://www.youtube.com/embed/${entry.id}?feature=oembed`}
		title="Top 10 Knots To Know"
		width={WIDTH}
	/>
	<div>{entry.description}</div>
</div>

<style>
	.owner span {
		display: inline-block;
		background: rgba(0, 0, 0, 0.082);
		padding: 0.125rem 0.25rem;
	}
</style>
