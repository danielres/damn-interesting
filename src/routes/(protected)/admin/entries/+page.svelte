<script lang="ts" scope="module">
	import type { PageData } from './$types'

	import { format } from '$lib/date'
	import { formatDuration } from '$lib/time'

	export let data: PageData

	const entries = data.admin.entries
</script>

<div class="card grid divide-y divide-white/20">
	{#each entries as entry}
		<a class="entry" href={`/admin/entries/${entry.id}`}>
			<div class="p-4">
				<div class="flex gap-4">
					<div>
						<img src={entry.thumbnailUrl} alt={entry.title} />
					</div>

					<div class="grid gap-2">
						<div>
							{entry.title}
							<div class="opacity-50">
								{format(entry.createdAt)}
								|
								{#if entry.duration}
									{formatDuration(entry.duration)}
								{:else}
									<span class="bg-red-600 px-2 py-1 text-xs">duration missing</span>
								{/if}
							</div>
						</div>
						<div class="owner">
							Added by <a href={`/admin/users/${entry.owner.slug}`}>{entry.owner.username}</a>
						</div>
					</div>
				</div>
			</div>
		</a>
	{/each}
</div>

<style lang="postcss">
	a.entry {
		&:hover {
			@apply bg-black/20 transition-colors;
		}
	}
	.owner {
		a {
			@apply rounded bg-black bg-opacity-20 px-1;
			&:hover {
				@apply bg-opacity-40;
			}
		}
	}

	.grid img {
		@apply w-24 rounded-lg border-4 border-white/20;
	}
</style>
