<script lang="ts" scope="module">
	import type { FormError } from '$lib/validators'

	import { dev } from '$app/environment'
	import * as validators from '$lib/validators'
	import Errors from '../../../../../components/forms/Errors.svelte'
	import Row from '../../../../../components/forms/Row.svelte'

	export let onSuccess: () => void
	export let code: string
	export let email: string

	let username: string = dev ? email.split('@')[0] : ''
	let password: string = dev ? 'pass' : ''
	let password2: string = dev ? 'pass' : ''

	let isCodeOfConductApproved = dev ? true : false

	let errors: FormError[] = []

	const onSubmit = async () => {
		const NewUserFromCodeData = { username, password, password2, code }

		errors = await validators.newUserFromCode(NewUserFromCodeData)
		if (errors.length > 0) return

		const response = await fetch('/auth/invite/register', {
			method: 'POST',
			body: JSON.stringify(NewUserFromCodeData),
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
		<label>
			My email:
			<input type="text" value={email} disabled />
		</label>
	</Row>

	<Row>
		<label>
			My username:
			<input type="text" bind:value={username} />
		</label>
	</Row>

	<Row>
		<label>
			Password:
			<input type="password" bind:value={password} />
		</label>
	</Row>

	<Row>
		<label>
			Password (repeat):
			<input type="password" bind:value={password2} />
		</label>
	</Row>

	<Row>
		<label>
			<input type="checkbox" bind:checked={isCodeOfConductApproved} />
			I have read the code of conduct, and I am a decent and nice human being.
		</label>
	</Row>

	{#if errors.length > 0}
		<Row>
			<Errors {errors} />
		</Row>
	{/if}

	<Row>
		<button disabled={!isCodeOfConductApproved}>Create my account</button>
	</Row>
</form>
