<script lang="ts" scope="module">
	import type { PageData } from './$types'

	import Entry from '$components/Entry.svelte'
	import { format } from '$lib/date'

	export let data: PageData

	$: tag = data.admin.tag!
</script>

<div class="mx-auto my-8 grid max-w-4xl gap-8">
	<h1 class="text-2xl">Tag: {tag.name}</h1>

	<div>
		<div>
			Created by: <a href="/admin/users/{tag.creator.slug}">{tag.creator.username}</a>
		</div>
		<div>Created on: {format(tag.createdAt)}</div>
	</div>

	<h2 class="text-xl">Entries ({tag.taggings.length})</h2>

	<div class="flex flex-wrap gap-4">
		{#each tag.taggings as { entry }}
			<div class="card w-64">
				<Entry {entry} />
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
</style>
