<script lang="ts" scope="module">
	import type { FormError } from '$lib/validators'
	import type { EntryView } from '$types'

	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { can } from '$can'
	import ButtonEdit from '$components/ButtonEdit.svelte'
	import Entry from '$components/Entry.svelte'
	import Errors from '$components/forms/Errors.svelte'
	import { format } from '$lib/date'
	import Tags from './Tags.svelte'

	export let data: {
		user: App.Locals['user']
		entry: EntryView
		suggestionsByAuthor: EntryView[]
	}

	let errors: FormError[] = []
	let isEditing = false

	let title = data.entry?.title || ''
	let description = data.entry?.description || ''

	$: ischanged = title !== data.entry?.title || description !== data.entry?.description
</script>

<div class="max-w-5xl mx-auto grid gap-16 py-12 md:px-8">
	<div class="grid">
		{#if can.updateEntry(data.user, data.entry)}
			<ButtonEdit
				{isEditing}
				toggle={() => (isEditing = !isEditing)}
				end={() => (isEditing = false)}
			/>
		{/if}

		<form
			class=""
			method="POST"
			action="/entries/{data.entry.id}?/update"
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
			<div class="card grid gap-6 bg-slate-900 border-2 border-black">
				<div class=" grid gap-4">
					<h1 class="grid gap-2">
						{#if isEditing}
							<input class="text-2xl" type="text" name="title" id="title" bind:value={title} />
						{:else}
							<div class="text-2xl text-slate-400">{data.entry.title}</div>
						{/if}
						<div class="text-sm flex gap-4">
							<div>
								<span class="text-slate-400">Created by</span>
								<a
									class="inline-block hover:underline underline-offset-4"
									href={`/user/${data.entry.authorUrl}`}
								>
									{data.entry.authorName}
								</a>
							</div>

							<div>
								<span class="text-slate-400">Shared by</span>
								<a
									class="hover:underline underline-offset-4"
									href={`/user/${data.entry.owner.slug}`}>{data.entry.owner.username}</a
								>
								<span class="text-slate-400 inline-block">on {format(data.entry.createdAt)}</span>
							</div>
						</div>
					</h1>

					<Tags entry={data.entry} {isEditing} />
				</div>
				<iframe
					class="w-full rounded-lg"
					style={`aspect-ratio: ${data.entry.width} / ${data.entry.height}`}
					allowfullscreen
					frameborder="0"
					src={`https://www.youtube.com/embed/${data.entry.id}?feature=oembed`}
					title={data.entry.title}
				/>

				{#if isEditing}
					<textarea name="description" id="description" rows="3" bind:value={description} />
				{:else}
					<div class="">{data.entry.description}</div>
				{/if}

				{#if isEditing}
					<div class="mx-auto grid gap-4">
						{#if errors.length > 0}
							<Errors {errors} />
						{/if}

						<button disabled={!ischanged} class="btn w-fit mx-auto" type="submit">Submit</button>
					</div>
				{/if}
			</div>
		</form>
	</div>

	{#if data.suggestionsByAuthor.length > 0}
		<div class="grid gap-4">
			<h3 class="border-b border-slate-500">Also by {data.entry.authorName}</h3>

			<div class="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
				{#each data.suggestionsByAuthor as suggested}
					<div class="card p-6 bg-slate-700">
						<Entry entry={suggested} mode="thumbnail" />
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
