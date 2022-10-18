<script lang="ts" scope="module">
	import type { FormError } from '$lib/validators'
	import type { PageData } from './$types'

	import Entry from '$components/Entry.svelte'
	import { format } from '$lib/date'

	export let data: PageData

	let errors: FormError[] = []
	$: tag = data.admin.tag!
</script>

<div class="max-w-4xl mx-auto my-8 grid gap-8">
	<h1 class="text-2xl">Tag: {tag.name}</h1>

	<div>
		<div>
			Created by: <a href="/admin/users/{tag.creator.slug}">{tag.creator.username}</a>
		</div>
		<div>Created on: {format(tag.createdAt)}</div>
	</div>

	<h2 class="text-xl">Entries ({tag.taggings.length})</h2>

	<div class="flex gap-4 flex-wrap">
		{#each tag.taggings as { entry }}
			<div class="w-64 card">
				<Entry {entry} />
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
</style>
