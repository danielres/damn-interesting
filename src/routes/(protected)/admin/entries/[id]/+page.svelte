<script lang="ts" scope="module">
	import type { PageData } from './$types'

	import { page } from '$app/stores'
	import { format } from '$lib/date'

	export let data: PageData
	const entry = data.admin.entry
</script>

<div class="max-w-xl mx-auto grid gap-16 my-8">
	{#if entry}
		<div class="card">
			<div class="grid grid-cols-2 gap-2">
				<div>Title</div>
				<div>{entry.title}</div>
				<div>Added</div>
				<div>{format(entry.createdAt)}</div>
				<div>Added by</div>
				<div>
					<a href={`/admin/users/${entry.owner.slug}`}>
						{entry.owner.username}
					</a>
				</div>
			</div>
		</div>
	{:else}
		<div class="mx-auto">Entry with id "{$page.params.id}" not found.</div>
	{/if}
</div>

<style lang="postcss">
	.card a {
		@apply bg-black inline-block px-1 rounded bg-opacity-20;
		&:hover {
			@apply bg-opacity-40;
		}
	}
</style>
