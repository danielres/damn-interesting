<script lang="ts">
	import type { Entry, Tag, Tagging, User } from '@prisma/client'

	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import FormEntryAssignTag from '$components/forms/FormEntryAssignTag.svelte'
	import { fade } from 'svelte/transition'

	export let isEditing = false

	export let entry: Entry & {
		owner: Pick<User, 'slug' | 'username'>
		taggings: (Tagging & { tag: Tag & { taggings: Tagging[] } })[]
	}
</script>

<ul class="flex flex-wrap gap-2 text-sm">
	{#each entry.taggings as { tag } (tag.id)}
		{@const isAlone = tag.taggings.length === 1}
		{@const isClickable = !isAlone}
		{@const isCountVisible = !isEditing && !isAlone}

		<li class="badge" transition:fade>
			<span>
				<a
					href="/tags/{tag.name}"
					class="inline-block {isClickable
						? 'underline-offset-2 hover:underline'
						: 'pointer-events-none opacity-60'}"
				>
					{tag.name}
				</a>

				{#if isCountVisible}
					<span class="text-xs opacity-50">
						({tag.taggings.length})
					</span>
				{/if}
			</span>

			{#if isEditing}
				<form
					action="/tags?/disconnect"
					method="post"
					use:enhance={({ data }) => {
						data.set('entryId', entry.id)
						data.set('tagId', tag.id)
						return invalidateAll
					}}
				>
					<button class="mini-circle danger" type="submit">-</button>
				</form>
			{/if}
		</li>
	{/each}

	{#if isEditing}
		<li>
			<FormEntryAssignTag {entry} />
		</li>
	{/if}
</ul>
