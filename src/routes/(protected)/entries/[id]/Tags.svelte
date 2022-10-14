<script lang="ts">
	import type { Entry, Tag } from '@prisma/client'

	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { fade } from 'svelte/transition'

	export let isEditing = false
	export let entry: {
		id: Entry['id']
		taggings: { tag: Tag }[]
	}
</script>

<ul class="text-sm flex gap-2 flex-wrap">
	{#each entry.taggings as { tag } (tag.id)}
		<li class="bg-slate-700 px-2 py-1 rounded-lg flex items-center gap-2" transition:fade>
			<span>{tag.name}</span>
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
					<button
						class="h-4 w-4 p-2 bg-red-600/50 hover:bg-red-600 font-bold text-xl flex items-center justify-center rounded-full"
						type="submit"
					>
						-
					</button>
				</form>
			{/if}
		</li>
	{/each}

	{#if isEditing}
		<li class="bg-slate-700 px-2 py-1 rounded-lg flex items-center gap-2">
			<form
				action="/tags?/connect-or-create"
				method="post"
				class="flex items-center gap-2 w-24"
				use:enhance={({ form, data }) => {
					data.set('entryId', entry.id)
					return () => {
						form.reset()
						invalidateAll()
					}
				}}
			>
				<input type="text" name="name" class="py-0 px-1" />

				<button
					class="h-4 w-4 px-2 bg-green-600/50 hover:bg-green-600 font-bold text-xl flex items-center justify-center rounded-full"
					type="submit"
				>
					+
				</button>
			</form>
		</li>
	{/if}
</ul>
