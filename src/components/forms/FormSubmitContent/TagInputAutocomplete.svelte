<script lang="ts">
	import { debounce } from '$lib/event'
	import { capitalizeFirst, sanitizeInputValue } from '$lib/string'
	import InputAutocomplete from '$components/forms/InputAutocomplete.svelte'
	import { Cache } from '$lib/cache'

	let suggestions: string[] = []
	let value = ''

	export let tags: string[]

	const cache = new Cache('suggestions', 15, 45)

	const filter = (str: string) => {
		return !tags.includes(str) && value !== str
	}

	$: value = capitalizeFirst(sanitizeInputValue(value, { trimEnd: false }))
	$: if (!value) suggestions = []
	$: if (value.length > 0) {
		if (cache.has(value)) suggestions = cache.get(value).filter(filter)
		else handleQuery(value)
	}

	const handleQuery = debounce(async (q: string) => {
		const body = new FormData()
		body.set('q', q)
		const response = await fetch('/tags?/query-tag-names', { method: 'POST', body })
		suggestions = (await response.json()).data.filter(filter)
		cache.set(q, suggestions)
	})
</script>

<form
	autocomplete="off"
	class="badge relative w-36"
	on:submit|preventDefault={() => {
		tags = [...tags, value]
		value = ''
	}}
>
	<InputAutocomplete bind:value bind:suggestions />

	<button class="mini-circle success" type="submit" disabled={value.length < 2}>+</button>
</form>

<style lang="postcss">
	form {
		:global(input) {
			@apply py-0 px-1;
		}
	}
</style>
