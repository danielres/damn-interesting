<script lang="ts">
	import type { FormError } from '$lib/validators'
	import type { PageData } from './$types'

	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { can } from '$can'
	import Errors from '$components/forms/Errors.svelte'
	import TextareaAutogrow from '$components/forms/TextareaAutogrow.svelte'
	import Prose from '$components/Prose.svelte'
	import { format } from '$lib/date'
	import { marked } from 'marked'
	import Suggestions from './Suggestions.svelte'
	import Tags from './Tags.svelte'

	export let data: PageData

	let errors: FormError[] = []
	let isEditing = false

	let title = data.entry!.title || ''
	let description = data.entry!.description || ''

	$: isChanged = title !== data.entry?.title || description !== data.entry?.description
	$: entry = data.entry!
</script>

<div class="mx-auto w-full max-w-5xl py-6 px-2 md:py-12 md:px-8">
	<form
		method="POST"
		action="/entries/{entry.id}?/update"
		use:enhance={() => {
			return ({ result }) => {
				errors = []
				if (result.type === 'success') {
					invalidateAll()
					isEditing = false
				}
				if (result.type === 'invalid') errors = result.data?.errors
				if (result.type === 'error') errors = [result.error]
			}
		}}
	>
		<div class="grid gap-8">
			<h1 class="flex items-center text-lg text-slate-400 md:text-2xl">
				{#if isEditing}
					<input class="p-0 md:text-2xl" type="text" name="title" id="title" bind:value={title} />
				{:else}
					{entry.title}
				{/if}
			</h1>

			<div class=" grid gap-4 md:grid-cols-2 md:gap-8">
				<div class="card h-fit border-2 border-black bg-slate-900">
					<iframe
						class="w-full rounded-lg"
						style="aspect-ratio: {entry.width}/{entry.height}"
						allowfullscreen
						frameborder="0"
						src="https://www.youtube.com/embed/{entry.id}?feature=oembed"
						title={entry.title}
					/>
				</div>

				<div class="grid h-fit gap-6">
					{#if isEditing}
						<div class="custom-textarea">
							<TextareaAutogrow
								bind:value={description}
								id="description"
								name="description"
								placeholder="Description"
							/>
						</div>
					{:else}
						<Prose>
							{@html marked(entry.description)}
						</Prose>
					{/if}

					<Tags {entry} {isEditing} />

					<div class="flex gap-4 text-sm">
						<div>
							<span class="text-slate-400">Created by</span>
							<a
								class="inline-block underline-offset-4 hover:underline"
								href="user/{entry.authorUrl}"
							>
								{entry.authorName}
							</a>
						</div>

						<div>
							<span class="text-slate-400">Shared by</span>
							<a class="underline-offset-4 hover:underline" href="/user/{entry.owner.slug}">
								{entry.owner.username}
							</a>
							<span class="inline-block text-slate-400">on {format(entry.createdAt)}</span>
						</div>
					</div>

					{#if can.updateEntry(data.user, entry)}
						{#if isEditing}
							{#if errors.length > 0}
								<Errors {errors} />
							{/if}
							<div class="flex gap-4">
								<button
									disabled={!isChanged}
									type="submit"
									class="rounded bg-green-600 bg-opacity-30 py-1 px-2 transition-all hover:bg-opacity-50"
								>
									Submit
								</button>
								<button
									type="button"
									on:click={() => (isEditing = false)}
									class="rounded bg-red-600 bg-opacity-30 py-1 px-2 transition-all hover:bg-opacity-50"
								>
									Cancel
								</button>
							</div>
						{:else}
							<button
								class="opacity-50 transition-opacity hover:opacity-100"
								on:click={() => (isEditing = true)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-6 w-6 rounded-full"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
									/>
								</svg>
							</button>
						{/if}
					{/if}
				</div>
			</div>
		</div>
	</form>

	{#if data.suggestionsByAuthor.length > 0}
		<div class="mt-16 grid gap-4">
			<h3 class="">Also by {entry.authorName}</h3>
			<Suggestions suggestions={data.suggestionsByAuthor} />
		</div>
	{/if}
</div>

<style lang="postcss">
	.custom-textarea :global(textarea) {
		@apply p-0 text-sm;
	}
</style>
