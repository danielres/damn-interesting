<script lang="ts">
	import type { EntriesGETResponse } from '../+server'

	import { page as pageStore } from '$app/stores'
	import Icon from '$components/Icon.svelte'
	import Prose from '$components/Prose.svelte'
	import SpeechBubble from '$components/SpeechBubble.svelte'
	import { format } from '$lib/date'
	import { highlight } from '$lib/html'
	import { to } from '$paths'
	import { marked } from 'marked'
	import EntryImage from './EntryImage.svelte'

	export let entry: Partial<EntriesGETResponse[0]>

	$: q = $pageStore.url.searchParams.get('q')
</script>

<a
	href="{to.entry(entry.id ?? '')}{$pageStore.url.search}"
	data-sveltekit-noscroll
	class="flex flex-col rounded border-2 border-black bg-slate-700 transition-all hover:border-slate-400"
>
	<EntryImage thumbnailUrl={entry.thumbnailUrl} title={entry.title} duration={entry.duration} />

	<div class="grid h-full gap-3 pt-4 pb-4 leading-tight">
		<h2 class="px-4 ">
			{@html highlight(entry.title, q)}
		</h2>

		<ul class="flex flex-wrap gap-1 px-4 text-xs">
			{#each (entry.taggings || []).map((t) => t.tag.name).sort() as tagName}
				{@const active = q?.toLowerCase() === tagName.toLowerCase()}
				<li>
					<a
						type="button"
						class="badge bg-slate-800 opacity-70 ring-inset hover:opacity-100 {active &&
							'pointer-events-none ring-2 ring-blue-500/75'}"
						href={to.search(tagName, $pageStore)}
					>
						{tagName}
					</a>
				</li>
			{/each}
		</ul>

		<div class="flex flex-col justify-end">
			<SpeechBubble class="mx-4">
				<div class="scrollbars-custom h-28 overflow-y-auto px-3 py-3 text-slate-300">
					<Prose>
						{@html marked(highlight(entry.description, q))}
					</Prose>
				</div>
			</SpeechBubble>

			<div class="mt-4 ml-7 mr-14 flex items-center justify-between text-sm">
				<div class="text-sm text-slate-400">
					{#if entry.createdAt}
						{format(entry.createdAt)}
					{/if}
				</div>

				{#if entry.owner}
					<a href="/user/{entry.owner.slug}" class="flex gap-1 underline-offset-4 hover:underline">
						<Icon type="user" class="h-5 w-5 opacity-80" />
						{entry.owner.username}
					</a>
				{/if}
			</div>
		</div>
	</div>
</a>

<style lang="postcss">
</style>
