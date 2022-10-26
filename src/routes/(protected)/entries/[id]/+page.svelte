<script lang="ts" scope="module">
	import type { FormError } from '$lib/validators'
	import type { PageData } from './$types'

	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { can } from '$can'
	import ButtonEdit from '$components/ButtonEdit.svelte'
	import Entry from '$components/Entry.svelte'
	import Errors from '$components/forms/Errors.svelte'
	import { format } from '$lib/date'
	import Tags from './Tags.svelte'

	export let data: PageData

	let errors: FormError[] = []
	let isEditing = false

	let title = data.entry!.title || ''
	let description = data.entry!.description || ''

	$: ischanged = title !== data.entry?.title || description !== data.entry?.description
	$: entry = data.entry!
</script>

<div class="mx-auto grid w-full max-w-5xl gap-16 py-12 md:px-8">
	<div class="grid">
		{#if can.updateEntry(data.user, entry)}
			<ButtonEdit
				{isEditing}
				toggle={() => (isEditing = !isEditing)}
				end={() => (isEditing = false)}
			/>
		{/if}

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
			<div class="card grid gap-6 border-2 border-black bg-slate-900">
				<div class=" grid gap-4">
					<h1 class="grid gap-2">
						{#if isEditing}
							<input class="p-0 text-2xl" type="text" name="title" id="title" bind:value={title} />
						{:else}
							<div class="text-2xl text-slate-400">{entry.title}</div>
						{/if}
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
					</h1>

					<Tags {entry} {isEditing} />
				</div>
				<iframe
					class="w-full rounded-lg"
					style="aspect-ratio: {entry.width}/{entry.height}"
					allowfullscreen
					frameborder="0"
					src="https://www.youtube.com/embed/{entry.id}?feature=oembed"
					title={entry.title}
				/>

				{#if isEditing}
					<textarea name="description" id="description" rows="3" bind:value={description} />
				{:else}
					<div>{entry.description}</div>
				{/if}

				{#if isEditing}
					<div class="mx-auto grid gap-4">
						{#if errors.length > 0}
							<Errors {errors} />
						{/if}

						<button disabled={!ischanged} class="btn mx-auto w-fit" type="submit">Submit</button>
					</div>
				{/if}
			</div>
		</form>
	</div>

	{#if data.suggestionsByAuthor.length > 0}
		<div class="grid gap-4">
			<h3 class="border-b border-slate-500">Also by {entry.authorName}</h3>

			<div class="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
				{#each data.suggestionsByAuthor as suggested}
					<div class="card bg-slate-700 p-6">
						<Entry entry={suggested} mode="thumbnail" />
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
