<script lang="ts">
	import { page } from '$app/stores'
	import type { PageData } from './$types'

	import Entry from '$components/Entry.svelte'

	export let data: PageData

	$: tag = data.tag
</script>

{#if tag}
	<ul class="flex flex-wrap justify-center gap-8">
		{#each tag.taggings as { entry } (entry.id)}
			<li class="card w-80">
				<Entry {entry} mode="thumbnail" />
			</li>
		{/each}
	</ul>
{:else}
	<div class="mx-auto my-6 text-3xl opacity-30">Tag not found</div>
{/if}
