<script lang="ts">
	import type { EntryGETResponse } from './+server'

	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Icon from '$components/Icon.svelte'
	import Modal from '$components/Modal2.svelte'
	import ButtonClose from '$components/Modal2/ButtonClose.svelte'
	import Prose from '$components/Prose.svelte'
	import SpeechBubble from '$components/SpeechBubble.svelte'
	import Spinner from '$components/Spinner.svelte'
	import YoutubePlayer from '$components/YoutubePlayer.svelte'
	import { format } from '$lib/date'
	import { to } from '$paths'
	import { getEntry } from '$components2/Entries/$entries'
	import { marked } from 'marked'
	import { onMount } from 'svelte'
	import colors from 'tailwindcss/colors'

	let entry: EntryGETResponse

	onMount(async () => {
		entry = await getEntry($page.params.id)
	})

	const onClose = () => goto(to.entries() + $page.url.search, { noScroll: true })
</script>

<Modal isOpen={true} {onClose} class="" let:close>
	<div slot="actions" />

	<div class="justify-center gap-6 md:flex" slot="main">
		<!-- COL1 -->
		<div class="aspect-video h-full md:w-[calc(75vw-5rem)]">
			<YoutubePlayer
				id={entry?.id}
				class="aspect-video h-full w-auto max-w-[100%] rounded-t border-2 border-black bg-black md:rounded"
			/>
		</div>

		<!-- COL2 -->
		<div
			class="relative flex flex-col gap-6 rounded-b border-2 border-black bg-slate-800 pb-8 max-md:border-t-0 md:w-[25vw] md:max-w-[45ch] md:rounded"
		>
			<div class="absolute top-2 right-2 flex flex-col-reverse justify-end gap-3">
				<button
					type="button"
					class="rounded-full border-slate-400 p-1 text-slate-400 ring-white/40 transition-colors hover:text-slate-100 hover:ring-2"
					title="Edit"
				>
					<Icon type="pencil" class="h-5 w-5" />
				</button>
				<ButtonClose on:click={close} />
			</div>

			{#if entry}
				<div class="mr-8 px-6 pt-6 text-lg">
					{entry.title}
					<a
						class="flex gap-1 text-sm text-slate-400  transition-colors hover:text-slate-200"
						href={entry.authorUrl}
						rel="external"
					>
						by {entry.authorName}
						<Icon type="external" class="h-4 w-4" />
					</a>
				</div>
				<div class="px-6">
					<ul class="flex flex-wrap gap-2 text-sm">
						{#each entry.taggings.map(({ tag }) => tag) as tag}
							<li class="badge">
								{tag.name}
							</li>
						{/each}
					</ul>
				</div>

				<div>
					<SpeechBubble class="mx-6" color={colors.slate[700]}>
						<div class="overflow-y-auto px-3 py-3 text-sm text-slate-300">
							<Prose>
								{@html marked(entry.description)}
							</Prose>
						</div>
					</SpeechBubble>
					<div class="mt-4 ml-9 mr-14 flex items-center justify-between text-sm">
						<div class="text-sm text-slate-400">{format(entry.createdAt)}</div>

						<a
							href="/user/{entry.owner.slug}"
							class="flex gap-1 underline-offset-4 hover:underline"
						>
							<Icon type="user" class="h-5 w-5 opacity-80" />
							{entry.owner.username}
						</a>
					</div>
				</div>
			{:else}
				<div class="flex h-full items-center justify-center">
					<Spinner />
				</div>
			{/if}
		</div>
	</div>
</Modal>
