<script lang="ts">
	import type { FormError } from '$lib/validators'

	import { dev } from '$app/environment'
	import Errors from './Errors.svelte'
	import TextareaAutogrow from './TextareaAutogrow.svelte'

	export let autofocus = false
	export let onSuccess = () => {}

	let url = dev ? 'https://youtu.be/1G72936Y3xA' : ''
	let description = ''
	let errors: FormError[] = []

	const onSubmit = async () => {
		errors = []

		const response = await fetch('/api/content', {
			method: 'POST',
			body: JSON.stringify({ url, description }),
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

	<div class="grid gap-2">
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

	<div>
		<button type="submit" class="btn">Submit</button>
	</div>
</form>

<style lang="postcss">
	input[type='text'],
	small {
		@apply mt-1 block leading-tight opacity-60;
	}
</style>
