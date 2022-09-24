<script lang="ts" scope="module">
	import type { FormError } from '$lib/validators'

	import { dev } from '$app/environment'
	import { enhance } from '$app/forms'
	import Errors from '../Errors.svelte'
	import Row from '../Row.svelte'

	export let onSuccess = () => window.location.reload()

	export let email = dev ? 'dan@example.com' : ''
	let password = dev ? 'pass' : ''

	let errors: FormError[] = []
</script>

<form
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
	<Row>
		<input type="email" name="email" placeholder="email" bind:value={email} />
	</Row>

	<Row>
		<input type="password" name="password" placeholder="password" bind:value={password} />
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
