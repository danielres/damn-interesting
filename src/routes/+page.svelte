<script lang="ts">
	import type { EntryView } from '../db/types'
	import Entry from '../components/Entry.svelte'

	export let data

	const entries: EntryView[] = data.entries
</script>

<div class="flex justify-center">
	<div class="entries">
		{#each entries as entry}
			<Entry {entry} />
		{/each}
	</div>
</div>

<style>
	.entries {
		width: 500px;
	}
</style>
