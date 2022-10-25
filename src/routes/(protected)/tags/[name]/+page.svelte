<script lang="ts">
	import { page } from '$app/stores'
	import type { PageData } from './$types'

	import Entry from '$components/Entry.svelte'

	export let data: PageData

	$: tag = data.tag
</script>

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
