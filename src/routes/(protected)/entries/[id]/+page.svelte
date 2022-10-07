<script lang="ts" scope="module">
	import type { FormError } from '$lib/validators'
	import type { EntryView } from '$types'

	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { can } from '$can'
	import Entry from '$components/Entry.svelte'
	import Errors from '$components/forms/Errors.svelte'
	import { format } from '$lib/date'
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
			<button
				class="mx-auto py-2 -mt-8 opacity-50 hover:opacity-100 transition-opacity"
				class:active={isEditing}
				title="Edit"
				on:click={() => (isEditing = !isEditing)}
			>
				<span class="sr-only">Edit</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-8 h-8 rounded-full p-1"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
					/>
				</svg>
			</button>
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
							<input type="text" name="title" id="title" bind:value={title} />
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

<style lang="postcss">
	button.active {
		@apply opacity-70;
		svg {
			@apply bg-white stroke-slate-900 animate-pulse;
		}
	}
</style>
