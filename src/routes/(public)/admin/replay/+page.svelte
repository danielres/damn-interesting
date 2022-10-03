<!-- TODO: FIX scope => context -->
<script lang="ts">
	import type { FormError } from '$lib/validators'
	import type { PageData } from './$types'

	import { enhance } from '$app/forms'
	import Errors from '$components/forms/Errors.svelte'

	export let data: PageData

	let errors: FormError[] = []
	let feedback = ''
</script>

<div class="card max-w-xl mx-auto my-16 text-center py-16">
	{#if data.can.replay}
		<form
			action="/api?/replay"
			method="post"
			use:enhance={() => {
				return ({ result }) => {
					errors = []
					if (result.type === 'success') feedback = 'success'
					if (result.type === 'invalid') errors = result.data?.errors
					if (result.type === 'error') errors = [result.error]
				}
			}}
		>
			<button type="submit" class="btn">Replay</button>
			{#if errors.length > 0}
				<div>
					<Errors {errors} />
				</div>
			{/if}
			{#if feedback}
				<div class="p-4">{feedback}</div>
			{/if}
		</form>
	{:else}
		Forbidden
	{/if}
</div>
