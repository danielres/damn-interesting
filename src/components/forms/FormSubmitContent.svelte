<script lang="ts">
	import type { FormError } from '$lib/validators'

	import { dev } from '$app/environment'
	import Errors from './Errors.svelte'

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
		<div>
			<small class="opacity-60">Note: only Youtube urls are currently supported</small>
		</div>
	</div>

	<div class="grid gap-4">
		<label for="description">What do you find particularly interesting in this content?</label>

		<textarea
			bind:value={description}
			cols="30"
			id="description"
			name="description"
			placeholder="Description"
			rows="3"
		/>
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
	textarea {
		@apply w-full;
	}
</style>
