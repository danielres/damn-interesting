<script lang="ts">
	import type { EntryView } from '$types'

	import Entry from '$components/Entry.svelte'

	export let data

	const entries: EntryView[] = data.entries
</script>

XXXXXX
<div class="flex justify-center">
	<div class="entries">
		{#each entries as entry}
			<Entry {entry} />
		{/each}
	</div>
</div>

<style lang="postcss">
	.entries {
		width: 500px;
	}
	.entries > :global(*) {
		@apply my-12;
	}
</style>
