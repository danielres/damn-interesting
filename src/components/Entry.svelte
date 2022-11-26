<script lang="ts">
	import type { Entry, User } from '@prisma/client'

	import Prose from '$components/Prose.svelte'
	import { format } from '$lib/date'
	import { formatDuration } from '$lib/time'
	import { marked } from 'marked'

	export let entry: Entry & { owner: Pick<User, 'slug' | 'username'> }
	export let mode: 'thumbnail' | 'view' = 'view'
</script>

<div class="flex h-full flex-col space-y-4">
	<h3 class="flex-grow drop-shadow-sharp">
		<div>
			{entry.title}
		</div>
		<div class="text-sm opacity-50">
			<a class="underline-offset-4 hover:underline" href={entry.authorUrl} rel="external">
				{entry.authorName}
			</a>
		</div>
	</h3>

	{#if mode === 'thumbnail'}
		<a
			href="/entries/{entry.id}"
			class="relative opacity-70 hover:opacity-100"
			data-sveltekit-prefetch
		>
			<img
				src={entry.thumbnailUrl}
				alt={entry.title}
				class="aspect-video w-full rounded-lg border-4 border-slate-600 object-cover transition-all hover:border-slate-400 hover:shadow-lg "
			/>

			{#if entry.duration}
				<div
					class="absolute right-0 bottom-0 rounded-tl-lg rounded-br-lg bg-slate-600 px-2 py-1 text-sm "
				>
					{formatDuration(entry.duration)}
				</div>
			{/if}
		</a>
	{/if}

	{#if mode === 'view'}
		<iframe
			class="aspect-video w-full rounded-lg border-4 border-slate-600"
			allowfullscreen
			frameborder="0"
			src="https://www.youtube.com/embed/{entry.id}?feature=oembed"
			title="Top 10 Knots To Know"
		/>
	{/if}

	<div class="grid gap-2">
		<div class="flex items-baseline space-x-4">
			<span class="ml-auto text-sm opacity-50">{format(entry.createdAt)}</span>
			<span class="mx-4">
				<a href="/user/{entry.owner.slug}" class="underline-offset-4 hover:underline">
					{entry.owner.username}
				</a>
			</span>
		</div>

		<div class="description fade-bottom h-20 overflow-y-hidden text-sm">
			<Prose>
				{@html marked(entry.description)}
			</Prose>
		</div>
	</div>
</div>

<style lang="postcss">
	.description :global(*) {
		@apply my-0;
	}
</style>
