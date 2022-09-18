<script lang="ts">
	import type { EntryView } from '../db/types'

	import { format } from '$lib/date'

	export let entry: EntryView

	const WIDTH = 500
	const ratio = entry.width / entry.height
</script>

<div>
	<div class="head">
		<span class="created-at">{format(entry.createdAt)}</span>
		<span class="owner">
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
</style>
