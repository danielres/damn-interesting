<script lang="ts" scope="module">
	import type { FormError } from '$lib/validators'

	import { dev } from '$app/environment'
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import * as validators from '$lib/validators'
	import Errors from '../Errors.svelte'

	const can = $page.data.can

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
			if (result.type === 'failure') errors = result.data?.errors
			if (result.type === 'error') errors = [result.error]
		}
	}}
>
	<div>
		<input
			disabled={!can.signup}
			type="text"
			name="username"
			placeholder="username"
			bind:value={username}
		/>
	</div>

	<div>
		<input
			disabled={!can.signup}
			type="email"
			name="email"
			placeholder="email"
			bind:value={email}
		/>
	</div>

	<div>
		<input
			disabled={!can.signup}
			type="password"
			name="password"
			placeholder="password"
			bind:value={password}
		/>
	</div>

	<div>
		<input
			disabled={!can.signup}
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
		<button disabled={!can.signup} class="btn" type="submit">Submit</button>
	</div>
</form>
