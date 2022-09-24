<script lang="ts" scope="module">
	import type { FormError } from '$lib/validators'

	import { dev } from '$app/environment'
	import { enhance } from '$app/forms'
	import * as validators from '$lib/validators'
	import Errors from '../Errors.svelte'
	import Row from '../Row.svelte'

	export let onSuccess: () => void

	let username = dev ? 'Dan' : ''
	let email = dev ? 'dan@example.com' : ''
	let password = dev ? 'pass' : ''
	let password2 = dev ? 'pass' : ''

	let errors: FormError[] = []
</script>

<form
	method="POST"
	action="/auth?/signup"
	use:enhance={({ data, cancel }) => {
		errors = validators.newUser(data)
		if (errors.length > 0) cancel()

		return async ({ result }) => {
			if (result.type === 'success') onSuccess()
			if (result.type === 'invalid') errors = result.data?.errors
			if (result.type === 'error') errors = [result.error]
		}
	}}
>
	<Row>
		<input type="text" name="username" placeholder="username" bind:value={username} />
	</Row>

	<Row>
		<input type="email" name="email" placeholder="email" bind:value={email} />
	</Row>

	<Row>
		<input type="password" name="password" placeholder="password" bind:value={password} />
	</Row>

	<Row>
		<input
			type="password"
			name="password2"
			placeholder="password (repeat)"
			bind:value={password2}
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
