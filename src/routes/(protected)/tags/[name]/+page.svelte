<script lang="ts">
	import type { PageData } from './$types'

	import Entries from '$components/Entries.svelte'

	export let data: PageData

	$: tag = data.tag
</script>

{#if tag}
	<Entries entries={tag.taggings.map((t) => t.entry)} />
{:else}
	<div class="mx-auto my-6 text-3xl opacity-30">Tag not found</div>
{/if}
