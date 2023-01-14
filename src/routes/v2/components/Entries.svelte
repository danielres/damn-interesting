<script lang="ts" context="module">
	import IntersectionObserver from '$components/IntersectionObserver.svelte'
	import { entries, loadMore, newEntriesCount, page } from '$components2/Entries/$entries'
	import EntryItem from '../entries/components/EntryItem.svelte'
</script>

<div class="grid grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))] gap-6">
	{#each $entries as entry (entry.id)}
		<EntryItem {entry} />
	{/each}

	{#if $newEntriesCount && $newEntriesCount > 0}
		{#key $page}
			<IntersectionObserver on:intersecting={loadMore} />
		{/key}
	{/if}
</div>
