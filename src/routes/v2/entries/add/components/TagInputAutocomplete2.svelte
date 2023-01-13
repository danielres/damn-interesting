<script lang="ts">
	import { Cache } from '$lib/cache'
	import { debounce } from '$lib/event'
	import { capitalizeFirst, sanitizeInputValue } from '$lib/string'
	import { to } from '$paths'
	import InputAutocomplete from '../../../components/forms/InputAutocomplete2.svelte'

	let suggestions: string[] = []
	let value = ''

	export let tags: string[]

	const cache = new Cache('suggestions', 15, 45)

	const filter = (str: string) => {
		return !tags.includes(str) && value !== str
	}

	$: value = capitalizeFirst(sanitizeInputValue(value, { trimEnd: false })) || ''
	$: if (!value) suggestions = []
	$: if (value.length > 0) {
		if (cache.has(value)) {
			suggestions = cache.get(value).filter(filter)
		} else {
			handleQuery(value)
		}
	}

	const handleQuery = debounce(async (q: string) => {
		const url = to.tags() + '?q=' + q
		const response = await fetch(url)
		suggestions = (await response.json()).filter(filter)
		cache.set(q, suggestions)
	})
</script>

<form
	class="badge relative w-36"
	on:submit|preventDefault={() => {
		tags = [...tags, value]
		value = ''
	}}
>
	<InputAutocomplete bind:value bind:suggestions />

	<button class="mini-circle success" type="button" disabled={value.length < 2}>+</button>
</form>

<style lang="postcss">
	form {
		:global(input) {
			@apply py-0 px-1;
		}
	}
</style>
