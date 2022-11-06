<script lang="ts">
	import type { PageData } from './$types'

	import Entry from '$components/Entry.svelte'
	import ButtonSubmitContentWithModal from '$components/ButtonSubmitContentWithModal.svelte'
	export let data: PageData
</script>

<div class="mx-auto grid max-w-7xl gap-4 py-2 px-2 sm:px-8">
	<ButtonSubmitContentWithModal />

	<div class="flex flex-wrap justify-center gap-8">
		{#each data.entries as entry}
			<div class="card p-4 transition-all hover:bg-slate-600 hover:shadow-2xl md:w-96 md:p-6">
				<Entry {entry} mode="thumbnail" />
			</div>
		{/each}
	</div>
</div>
