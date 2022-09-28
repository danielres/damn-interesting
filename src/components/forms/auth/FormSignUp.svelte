<script lang="ts" scope="module">
	import type { FormError } from '$lib/validators'

	import { dev } from '$app/environment'
	import { enhance } from '$app/forms'
	import * as validators from '$lib/validators'
	import Errors from '../Errors.svelte'

	export let onSuccess: () => void

	let username = dev ? 'Dan' : ''
	let email = dev ? 'dan@example.com' : ''
	let password = dev ? 'pass' : ''
	let password2 = dev ? 'pass' : ''

	let errors: FormError[] = []
</script>

<form
	class="grid gap-4"
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
	<div>
		<input type="text" name="username" placeholder="username" bind:value={username} />
	</div>

	<div>
		<input type="email" name="email" placeholder="email" bind:value={email} />
	</div>

	<div>
		<input type="password" name="password" placeholder="password" bind:value={password} />
	</div>

	<div>
		<input
			type="password"
			name="password2"
			placeholder="password (repeat)"
			bind:value={password2}
		/>
	</div>

	{#if errors.length > 0}
		<Errors {errors} />
	{/if}

	<div>
		<button class="btn" type="submit">Submit</button>
	</div>
</form>
