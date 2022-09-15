<script lang="ts">
	import type { Entry } from '../db/types'

	export let data

	const WIDTH = 500
	const entries: Entry[] = data.entries
</script>

<div class="flex justify-center">
	<div class="entries">
		{#each entries as entry}
			{@const ratio = entry.width / entry.height}
			{@const id = entry.thumbnailUrl.split('/vi/')[1].split('/')[0]}

			<div class="my-16">
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
</style>
