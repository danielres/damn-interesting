<script lang="ts">
	import type { Entry, Tag, Tagging } from '@prisma/client'

	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { debounce } from '$lib/event'
	import { capitalizeFirst, sanitizeInputValue } from '$lib/string'
	import InputAutocomplete from './InputAutocomplete.svelte'

	type Props = {
		Entry: Entry & {
			taggings: (Tagging & { tag: Tag })[]
		}
	}

	export let entry: Props['Entry']

	let suggestions: string[] = []
	let value = ''

	$: value = capitalizeFirst(sanitizeInputValue(value, { trimEnd: false }))
	$: if (!value) suggestions = []
	$: if (value.length > 0) handleQuery(value)

	const filter = (str: string) => !entry.taggings.map(({ tag }) => tag.name).includes(str)

	const handleQuery = debounce(async (q: string) => {
		const body = new FormData()
		body.set('q', q)
		const res = await fetch('/tags?/query-tag-names', { method: 'POST', body })
		suggestions = (await res.json()).data.filter(filter)
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
