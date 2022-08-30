<script lang="ts">
	import FormInviteNewMember from '../components/forms/FormInviteNewMember.svelte'
	import { entries } from '../data'

	const YoutubeGetVideoDetails = async (url: string) =>
		fetch(`https://www.youtube.com/oembed?url=${url}&format=json`).then((res) => res.json())

	const promises = entries.map((entry) => YoutubeGetVideoDetails(entry.url))
	const resolved = Promise.all(promises)

	const WIDTH = 600
</script>

<h1>Damn interesting: latest</h1>

{#await resolved then entries}
	{#each entries as entry}
		{@const ratio = entry.width / entry.height}
		{@const id = entry.thumbnail_url.split('/vi/')[1].split('/')[0]}

		<div>
			<h3>
				{entry.title}
				<small>by <a href={entry.author_url} target="_BLANK">{entry.author_name}</a></small>
			</h3>
		</div>
		<iframe
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
			frameborder="0"
			height={WIDTH / ratio}
			src={`https://www.youtube.com/embed/${id}?feature=oembed`}
			title="Top 10 Knots To Know"
			width={WIDTH}
		/>
	{/each}
{/await}

<hr />
<h3>Invite a new member</h3>
<FormInviteNewMember />
