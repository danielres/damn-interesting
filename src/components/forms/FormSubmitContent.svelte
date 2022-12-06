<script lang="ts">
	import type { FormError } from '$lib/validators'

	import EntryImage from '$components/Entry/EntryImage.svelte'
	import { getYoutubeGetVideoDetails } from '$lib/Entry/youtube'
	import { fade } from 'svelte/transition'
	import Errors from './Errors.svelte'
	import TagInputAutocomplete from './FormSubmitContent/TagInputAutocomplete.svelte'
	import TextareaAutogrow from './TextareaAutogrow.svelte'

	export let autofocus = false
	export let onSuccess = () => {}

	let errors: FormError[] = []

	let url = ''
	let description = ''
	let titleInput: HTMLInputElement
	let tags: string[] = []

	$: oembedPromise = getYoutubeGetVideoDetails(url)

	$: {
		oembedPromise
		errors = []
	}

	const onSubmit = async () => {
		errors = []

		const data = {
			...(await oembedPromise),
			title: titleInput.value,
			description,
			url,
			tags,
		}

		const response = await fetch('/api/content', {
			method: 'POST',
			body: JSON.stringify(data),
		})

		if (response.ok) onSuccess()
		if (!response.ok) errors = await response.json()
	}
</script>

<form on:submit|preventDefault={onSubmit} class="grid gap-4">
	<div>
		<!-- svelte-ignore a11y-autofocus -->
		<input {autofocus} type="text" name="url" id="url" placeholder="url" bind:value={url} />
		<small>Only Youtube urls are currently supported</small>
	</div>

	{#await oembedPromise then value}
		<div class="max-w-xs mx-auto relative">
			<EntryImage duration={value.duration} thumbnailUrl={value.thumbnailUrl} title="Preview" />
			<div class="absolute top-0 left-0 right-0 bottom-0" />
		</div>

		<div>
			<label for="title" class="leading-tight">Title</label>
			<input type="text" name="title" id="title" value={value.title} bind:this={titleInput} />
			<small>Please clean, shorten or reword if appropriate.</small>
		</div>

		<div>
			<label for="description" class="leading-tight">
				What do you find particularly interesting in this content?
			</label>

			<TextareaAutogrow
				bind:value={description}
				id="description"
				name="description"
				placeholder="Description"
			/>

			<small>
				Markdown supported, long descriptions supported. <br />
				Only the first 3 lines are visible in the previews.
			</small>
		</div>

		<div>
			<div class="leading-tight">Tags</div>
			<ul class="flex flex-wrap gap-2 text-sm mt-1">
				{#each tags as tag (tag)}
					<li class="badge" transition:fade>
						{tag}
						<button
							class="mini-circle danger"
							type="button"
							on:click={() => (tags = tags.filter((t) => t !== tag))}
						>
							-
						</button>
					</li>
				{/each}
				<li>
					<TagInputAutocomplete bind:tags />
				</li>
			</ul>
		</div>

		{#if errors.length > 0}
			<div>
				<Errors {errors} />
			</div>
		{/if}

		<div class="text-center">
			<button type="submit" class="btn">Submit</button>
		</div>
	{:catch error}
		{#if url.length > 0}
			<div>
				<Errors errors={[{ message: 'Invalid Youtube URL.' }]} />
			</div>
		{/if}
	{/await}
</form>

<style lang="postcss">
	form {
		input[type='text'],
		:global(textarea),
		:global(.replicated) {
			@apply p-2;
		}

		small {
			@apply mt-1 ml-2 block leading-snug drop-shadow-sharp;
		}
		:global(textarea),
		:global(textarea) {
		}
	}
</style>
