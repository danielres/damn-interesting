<script lang="ts">
	import type { Entry, Tag, Tagging, User } from '@prisma/client'

	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { format } from '$lib/input'
	import { sanitizeTagName } from '$lib/string'
	import { fade } from 'svelte/transition'

	export let isEditing = false
	export let entry: Entry & {
		owner: Pick<User, 'slug' | 'username'>
		taggings: (Tagging & {
			tag: Tag & {
				taggings: Tagging[]
			}
		})[]
	}
</script>

<ul class="text-sm flex gap-2 flex-wrap">
	{#each entry.taggings as { tag } (tag.id)}
		{@const isAlone = tag.taggings.length === 1}
		{@const isClickable = !isAlone}
		{@const isCountVisible = !isEditing && !isAlone}

		<li class="badge" transition:fade>
			<span>
				<a
					href="/tags/{tag.name}"
					class="inline-block {isClickable
						? 'hover:underline underline-offset-2'
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
					<button class="mini-button danger" type="submit">-</button>
				</form>
			{/if}
		</li>
	{/each}

	{#if !isEditing}
		<li>
			<form
				action="/tags?/connect-or-create"
				method="post"
				class="badge flex items-center gap-2 w-36"
				use:enhance={({ form, data }) => {
					data.set('entryId', entry.id)
					return () => {
						form.reset()
						invalidateAll()
					}
				}}
			>
				<input type="text" name="name" class="py-0 px-1" use:format={sanitizeTagName} />

				<button class="mini-button success" type="submit">+</button>
			</form>
		</li>
	{/if}
</ul>

<style lang="postcss">
	.mini-button {
		@apply font-bold text-xl flex items-center justify-center rounded-full h-4 w-4 px-2;

		&.success {
			@apply bg-green-600/50 hover:bg-green-600;
		}
		&.danger {
			@apply bg-red-600/50 hover:bg-red-600;
		}
	}
</style>
