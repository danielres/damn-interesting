<script lang="ts" scope="module">
	import type { FormError } from '$lib/validators'

	export let onSuccess = () => window.location.reload()

	import { dev } from '$app/environment'
	import { userStore } from '$stores/user'
	import Errors from '../Errors.svelte'
	import Row from '../Row.svelte'

	export let email = dev ? 'dan@example.com' : ''
	let password = dev ? 'pass' : ''

	let errors: FormError[] = []

	const onSubmit = async () => {
		const credentialsData = { email, password }

		const response = await fetch('/auth/signin', {
			method: 'POST',
			body: JSON.stringify(credentialsData),
		})

		if (response.ok) {
			$userStore = await response.json()
			onSuccess()
		}
		if (!response.ok) errors = await response.json()
	}
</script>

<form method="POST" on:submit|preventDefault={onSubmit}>
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
