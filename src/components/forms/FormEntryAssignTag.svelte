<script lang="ts">
	import type { Entry, Tag, Tagging } from '@prisma/client'

	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { debounce } from '$lib/event'
	import { capitalizeFirst, sanitizeInputValue } from '$lib/string'
	import InputAutocomplete from './InputAutocomplete.svelte'
	import { Cache } from '$lib/cache'
	type Props = {
		Entry: Entry & {
			taggings: (Tagging & { tag: Tag })[]
		}
	}

	export let entry: Props['Entry']

	let suggestions: string[] = []
	let value = ''

	const cache = new Cache('suggestions', 15, 45)

	$: value = capitalizeFirst(sanitizeInputValue(value, { trimEnd: false }))
	$: if (!value) suggestions = []
	$: if (value.length > 0) {
		if (cache.has(value)) suggestions = cache.get(value)
		else handleQuery(value)
	}

	const filter = (str: string) => !entry.taggings.map(({ tag }) => tag.name).includes(str)

	const handleQuery = debounce(async (q: string) => {
		const body = new FormData()
		body.set('q', q)
		const response = await fetch('/tags', { method: 'POST', body })
		const fetchedTags = await response.json()
		suggestions = fetchedTags.filter(filter)
		cache.set(q, suggestions)
	})
</script>

<form
	class="badge relative w-36"
	action="/tags?/connect-or-create"
	autocomplete="off"
	method="post"
	use:enhance={({ form, data, cancel }) => {
		const name = data.get('name')?.toString()
		if (!name) return cancel()

		data.set('entryId', entry.id)
		suggestions = []

		return () => {
			form.reset()
			invalidateAll()
		}
	}}
>
	<InputAutocomplete bind:value bind:suggestions />

	<button class="mini-circle success" type="submit">+</button>
</form>

<style lang="postcss">
	form {
		:global(input) {
			@apply py-0 px-1;
		}
	}
</style>
