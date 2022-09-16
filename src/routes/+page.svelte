<script lang="ts">
	import type { EntryView } from '../db/types'

	export let data

	const WIDTH = 500
	const entries: EntryView[] = data.entries
</script>

<div class="flex justify-center">
	<div class="entries">
		{#each entries as entry}
			{@const ratio = entry.width / entry.height}
			{@const id = entry.thumbnailUrl.split('/vi/')[1].split('/')[0]}

			<div class="my-16">
				<div class="owner">
					<span>
						{entry.owner.username}
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
					src={`https://www.youtube.com/embed/${id}?feature=oembed`}
					title="Top 10 Knots To Know"
					width={WIDTH}
				/>
				<div>{entry.description}</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.entries {
		width: 500px;
	}

	.owner span {
		display: inline-block;
		background: rgba(0, 0, 0, 0.082);
		padding: 0.125rem 0.25rem;
	}
</style>
