<script lang="ts">
	import type { Entry as TEntry, User } from '@prisma/client'
	import Entry from '$components/Entry.svelte'

	type EntryWithOwner = TEntry & {
		owner: {
			slug: User['slug']
			username: User['username']
		}
	}

	export let entries: EntryWithOwner[]
</script>

<div class="flex flex-wrap justify-center gap-8">
	{#each entries as entry}
		<div class="card p-4 transition-all hover:bg-slate-600 hover:shadow-2xl md:w-96 md:p-6">
			<Entry {entry} mode="thumbnail" />
		</div>
	{/each}
</div>
