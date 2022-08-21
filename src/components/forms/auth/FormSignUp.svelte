<script lang="ts" scope="module">
	import type { FormError } from '../../../lib/validators'

	import * as validators from '../../../lib/validators'
	import Row from '../Row.svelte'
	import Errors from '../Errors.svelte'
	import { dev } from '$app/env'

	export let onSuccess: () => void

	let username = dev ? 'Dan' : ''
	let email = dev ? 'dan@example.com' : ''
	let password = dev ? 'pass' : ''
	let password2 = dev ? 'pass' : ''

	let errors: FormError[] = []

	const onSubmit = async (event: Event) => {
		const newUserData = { username, email, password, password2 }

		errors = await validators.newUser(newUserData)
		if (errors.length > 0) return

		const response = await fetch('/auth/signup', {
			method: 'POST',
			body: JSON.stringify(newUserData),
		})

		if (response.ok) {
			errors = []
			onSuccess()
		}

		if (!response.ok) errors = await response.json()
	}
</script>

<form method="POST" on:submit|preventDefault={onSubmit}>
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
