<script lang="ts" scope="module">
	import type { FormError } from '$lib/validators'

	import { dev } from '$app/environment'
	import { enhance } from '$app/forms'
	import Errors from '../Errors.svelte'

	export let onSuccess = () => window.location.reload()

	export let email = dev ? 'dan@example.com' : ''
	let password = dev ? 'pass' : ''

	let errors: FormError[] = []
</script>

<form
	class="grid gap-4"
	method="POST"
	action="/auth?/signin"
	use:enhance={() => {
		return ({ result }) => {
			if (result.type === 'success') onSuccess()
			if (result.type === 'invalid') errors = result.data?.errors
			if (result.type === 'error') errors = [result.error]
		}
	}}
>
	<div>
		<input type="email" name="email" placeholder="email" bind:value={email} />
	</div>

	<div>
		<input type="password" name="password" placeholder="password" bind:value={password} />
	</div>

	{#if errors.length > 0}
		<Errors {errors} />
	{/if}

	<div>
		<button class="btn" type="submit">Submit</button>
	</div>
</form>
