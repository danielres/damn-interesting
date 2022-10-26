<script lang="ts" scope="module">
	import type { PageData } from './$types'

	import Entry from '$components/Entry.svelte'
	export let suggestions: PageData['suggestionsByAuthor']
</script>

<div class="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
	{#each suggestions as suggestion}
		<div class="card bg-slate-700 p-6">
			<Entry entry={suggestion} mode="thumbnail" />
		</div>
	{/each}
</div>
