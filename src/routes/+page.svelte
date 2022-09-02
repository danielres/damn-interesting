<script lang="ts">
	import { entries } from '../data'

	const YoutubeGetVideoDetails = async (url: string) =>
		fetch(`https://www.youtube.com/oembed?url=${url}&format=json`).then((res) => res.json())

	const promises = entries.map((entry) => YoutubeGetVideoDetails(entry.url))
	const resolved = Promise.all(promises)

	const WIDTH = 500
</script>

<div class="flex justify-center">
	{#await resolved then entries}
		<div class="entries">
			{#each entries as entry}
				{@const ratio = entry.width / entry.height}
				{@const id = entry.thumbnail_url.split('/vi/')[1].split('/')[0]}

				<div class="my-16">
					<h3 class="flex items-baseline justify-between">
						<div class="title opacity-75">
							{entry.title}
						</div>
						<div class="text-sm opacity-50">
							<a class="hover:underline" href={entry.author_url} target="_BLANK">
								{entry.author_name}
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
				</div>
			{/each}
		</div>
	{/await}
</div>

<style>
	.entries {
		width: 500px;
	}
</style>
