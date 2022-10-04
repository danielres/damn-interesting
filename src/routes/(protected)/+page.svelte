<script lang="ts">
	import type { EntryView } from '$types'

	import Entry from '$components/Entry.svelte'
	import ButtonSubmitContentWithModal from '$components/ButtonSubmitContentWithModal.svelte'

	export let data

	const entries: EntryView[] = data.entries
</script>

<div class="py-12 px-2 sm:px-8 max-w-7xl mx-auto">
	<ButtonSubmitContentWithModal />

	<div class="grid gap-8">
		{#each entries as entry}
			<div class="card p-4 md:p-6 hover:shadow-2xl hover:bg-slate-600 transition-all">
				<Entry {entry} mode="thumbnail" />
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.grid {
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
	}
</style>
