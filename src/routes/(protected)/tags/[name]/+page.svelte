<script lang="ts">
	import { page } from '$app/stores'
	import type { PageData } from './$types'

	import Entry from '$components/Entry.svelte'

	export let data: PageData

	$: tag = data.tag
	$: tags = data.tags

	$: name = $page.params.name
</script>

<div class="mx-auto my-8 grid max-w-4xl gap-12">
	{#if tags}
		<ul class="flex flex-wrap justify-center gap-2 text-sm">
			{#each tags as tag (tag.id)}
				<li
					class="badge {name === tag.name
						? 'pointer-events-none ring ring-black/50'
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
	<h1 class="mx-auto text-3xl ">
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
		<ul class="flex flex-wrap justify-center gap-8">
			{#each tag.taggings as { entry } (entry.id)}
				<li class="card w-80">
					<Entry {entry} mode="thumbnail" />
				</li>
			{/each}
		</ul>
	{/if}
</div>
