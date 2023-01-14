<script lang="ts" scope="module">
	import type { FormError } from '$lib/validators'
	import type { PageData } from './$types'

	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import Entry from '$components/Entry.svelte'
	import Errors from '$components/forms/Errors.svelte'
	import { format } from '$lib/date'

	export let data: PageData

	let errors: FormError[] = []
	let title = data.admin.entry?.title || ''
	let description = data.admin.entry?.description || ''
	let duration = data.admin.entry?.duration

	$: ischanged =
		title !== data.admin.entry?.title ||
		description !== data.admin.entry?.description ||
		duration !== data.admin.entry?.duration
</script>

<div class="mx-auto my-8 grid max-w-4xl gap-8 md:grid-cols-2">
	{#if data.admin.entry}
		<form
			class="card grid gap-4"
			method="POST"
			action="/entries/{data.admin.entry.id}?/update"
			use:enhance={() => {
				return ({ result }) => {
					errors = []
					if (result.type === 'success') invalidateAll()
					if (result.type === 'failure') errors = result.data?.errors
					if (result.type === 'error') errors = [result.error]
				}
			}}
		>
			<div>
				<label for="title">Title</label>
				<textarea id="title" name="title" bind:value={title} rows="3" />
			</div>

			<div>
				<label for="createdAt">Added</label>
				<input
					disabled
					type="text"
					name="createdAt"
					id="createdAt"
					value={format(data.admin.entry.createdAt)}
				/>
			</div>

			<div>
				<label for="owner">Added by</label>
				<input
					disabled
					type="text"
					name="owner"
					id="owner"
					value={data.admin.entry.owner.username}
				/>
			</div>

			<div>
				<label for="description">Description</label>
				<textarea name="description" id="description" bind:value={description} rows="4" />
			</div>

			<div>
				<label for="duration">
					Duration
					{#if !duration}
						<span class="bg-red-600 px-2 py-1 text-xs">missing</span>
					{/if}
				</label>
				<input type="text" name="duration" id="duration" bind:value={duration} />
			</div>

			{#if errors.length > 0}
				<div>
					<Errors {errors} />
				</div>
			{/if}

			<div>
				<button disabled={!ischanged} type="submit" class="btn">Update</button>
			</div>
		</form>

		<div>
			<div>
				<Entry entry={{ ...data.admin.entry, title, description }} />
			</div>
		</div>
	{:else}
		<div class="mx-auto">Entry with id "{$page.params.id}" not found.</div>
	{/if}
</div>

<style lang="postcss">
	form > div {
		@apply grid gap-0.5 py-1;

		label {
			@apply font-bold;
		}

		textarea {
			@apply resize-y text-sm;
		}
	}
</style>
