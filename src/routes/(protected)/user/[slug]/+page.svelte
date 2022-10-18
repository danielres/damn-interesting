<script scope="module" lang="ts">
	import type { PageData } from './$types'

	import Entry from '$components/Entry.svelte'

	export let data: PageData
	$: user = data.user!
</script>

<div class="mx-auto my-12 grid max-w-7xl gap-12 md:p-8">
	<h1>
		<small class="block text-slate-500">Also curated by</small>
		{user.username}
	</h1>

	<div>
		<div class="entries grid gap-8">
			{#each data.entries as entry}
				<div class="card p-4 transition-all hover:bg-slate-600 hover:shadow-2xl md:p-6">
					<Entry {entry} mode="thumbnail" />
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	h1 {
		@apply text-center text-2xl;
	}

	.grid.entries {
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
	}
</style>
