<script lang="ts" scope="module">
	import type { EntryView } from '$types'

	import Entry from '$components/Entry.svelte'
	import { format } from '$lib/date'

	export let data: {
		entry: EntryView
		suggestionsByAuthor: EntryView[]
	}
</script>

<div class="max-w-5xl mx-auto grid gap-16 py-12 px-8">
	<div class="card grid gap-6 bg-slate-900 border-2 border-black">
		<div class="px-2 grid gap-4">
			<h1 class="grid gap-2">
				<div class="text-2xl text-slate-400">{data.entry.title}</div>
				<div class="text-sm flex gap-4">
					<div>
						<span class="text-slate-400">Created by</span>
						<a
							class="inline-block hover:underline underline-offset-4"
							href={`/user/${data.entry.authorUrl}`}
						>
							{data.entry.authorName}
						</a>
					</div>

					<div>
						<span class="text-slate-400">Shared by</span>
						<a class="hover:underline underline-offset-4" href={`/user/${data.entry.owner.slug}`}
							>{data.entry.owner.username}</a
						>
						<span class="text-slate-400 inline-block">on {format(data.entry.createdAt)}</span>
					</div>
				</div>
			</h1>
		</div>

		<iframe
			class="w-full rounded-lg"
			style={`aspect-ratio: ${data.entry.width} / ${data.entry.height}`}
			allow="autoplay; clipboard-write; encrypted-media;"
			allowfullscreen
			frameborder="0"
			src={`https://www.youtube.com/embed/${data.entry.id}?feature=oembed`}
			title={data.entry.title}
		/>

		<div class="px-2">{data.entry.description}</div>
	</div>

	<div class="grid gap-4">
		<h3 class="border-b border-slate-500">Also by {data.entry.authorName}</h3>

		<div class="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
			{#each data.suggestionsByAuthor as suggested}
				<div class="card p-6 bg-slate-700">
					<Entry entry={suggested} mode="thumbnail" />
				</div>
			{/each}
		</div>
	</div>
</div>
