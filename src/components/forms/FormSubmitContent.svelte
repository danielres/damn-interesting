<script lang="ts">
	import type { FormError } from '$lib/validators'
	import type { EntryView } from '../../db/types'

	import { dev } from '$app/environment'
	import Errors from './Errors.svelte'
	import Row from './Row.svelte'

	let url = dev ? 'https://youtu.be/1G72936Y3xA' : ''
	let description = ''
	let errors: FormError[] = []
	let result: EntryView | undefined = undefined

	const addAnother = () => {
		url = ''
		description = ''
		errors = []
		result = undefined
	}

	const onSubmit = async () => {
		errors = []

		const response = await fetch('/api/content', {
			method: 'POST',
			body: JSON.stringify({ url, description }),
		})

		if (response.ok) result = await response.json()
		if (!response.ok) errors = await response.json()
	}
</script>

{#if result}
	<pre>{JSON.stringify(result, null, 2)}</pre>
	<button
		on:click={addAnother}
		class="py-2 px-4 bg-green-200 text-green-700 font-bold my-4 opacity-70 hover:opacity-100"
	>
		Add another
	</button>
{:else}
	<form on:submit|preventDefault={onSubmit}>
		<Row>
			<div>
				<label for="url">Url</label>
			</div>
			<input type="text" name="url" id="url" placeholder="url" bind:value={url} />
			<div>
				<small>Note: only Youtube urls are currently supported</small>
			</div>
		</Row>

		<Row>
			<div>
				<label for="description">What do you find particularly interesting in this content?</label>
			</div>
			<textarea
				bind:value={description}
				cols="30"
				id="description"
				name="description"
				placeholder="Description"
				rows="3"
			/>
		</Row>

		{#if errors.length > 0}
			<Row>
				<Errors {errors} />
			</Row>
		{/if}

		<Row>
			<button type="submit">Submit</button>
		</Row>
	</form>
{/if}

<style lang="postcss">
	input[type='text'],
	textarea {
		@apply w-full;
	}
</style>
