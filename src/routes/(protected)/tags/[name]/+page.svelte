<script lang="ts">
	import { page } from '$app/stores'
	import type { PageData } from './$types'

	import Entry from '$components/Entry.svelte'

	export let data: PageData

	$: tag = data.tag
	$: tags = data.tags

	$: name = $page.params.name
</script>

<div class="max-w-4xl mx-auto my-8 grid gap-12">
	{#if tags}
		<ul class="text-sm flex gap-2 flex-wrap justify-center">
			{#each tags as tag (tag.id)}
				<li
					class="badge {name === tag.name
						? 'ring ring-black/50 pointer-events-none'
						: 'opacity-70 hover:opacity-100'}"
				>
					<span>
						<a href="/tags/{tag.name}" class="inline-block">
							{tag.name}
						</a>
						<span class="text-xs opacity-50">
							({tag.taggings.length})
						</span>
					</span>
				</li>
			{/each}
		</ul>
	{/if}
	<h1 class="text-3xl mx-auto ">
		<span class="opacity-30">Tag:</span>

		<span>
			{#if tag}
				{tag.name}
			{:else}
				Not found
			{/if}
		</span>
	</h1>

	{#if tag}
		<ul class="flex flex-wrap gap-8 justify-center">
			{#each tag.taggings as { entry } (entry.id)}
				<li class="w-80 card">
					<Entry {entry} mode="thumbnail" />
				</li>
			{/each}
		</ul>
	{/if}
</div>
