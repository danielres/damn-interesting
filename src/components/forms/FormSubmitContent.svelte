<script lang="ts">
	import type { FormError } from '$lib/validators'

	import { getYoutubeGetVideoDetails } from '$lib/Entry/youtube'
	import Errors from './Errors.svelte'
	import TextareaAutogrow from './TextareaAutogrow.svelte'

	export let autofocus = false
	export let onSuccess = () => {}

	let errors: FormError[] = []

	let url = ''
	let description = ''
	let titleInput: HTMLInputElement

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
		<div>
			<img src={value.thumbnailUrl} alt="Preview" class="w-1/2 mx-auto" />
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

		{#if errors.length > 0}
			<div>
				<Errors {errors} />
			</div>
		{/if}

		<div class="text-center">
			<button type="submit" class="btn">Submit</button>
		</div>
	{:catch error}
		<div>
			<Errors errors={[{ message: 'Invalid Youtube URL.' }]} />
		</div>
	{/await}
</form>

<style lang="postcss">
	input[type='text'],
	small {
		@apply mt-1 block leading-tight opacity-60;
	}
</style>
