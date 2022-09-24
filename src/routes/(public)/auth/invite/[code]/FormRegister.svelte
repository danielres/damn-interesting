<script lang="ts" scope="module">
	import type { FormError } from '$lib/validators'

	import { dev } from '$app/environment'
	import { enhance } from '$app/forms'
	import Errors from '$components/forms/Errors.svelte'
	import Row from '$components/forms/Row.svelte'
	import * as validators from '$lib/validators'

	export let onSuccess: () => void
	export let code: string
	export let email: string

	let username: string = dev ? email.split('@')[0] : ''
	let password: string = dev ? 'pass' : ''
	let password2: string = dev ? 'pass' : ''

	let isCodeOfConductApproved = dev ? true : false

	let errors: FormError[] = []
</script>

<form
	method="POST"
	action="/auth?/signup-with-code"
	use:enhance={({ data, cancel }) => {
		errors = validators.newUserFromCode(data)
		if (errors.length > 0) cancel()

		return async ({ result }) => {
			if (result.type === 'success') onSuccess()
			if (result.type === 'invalid') errors = result.data?.errors
			if (result.type === 'error') errors = [result.error]
		}
	}}
>
	<input type="hidden" name="code" value={code} />
	<Row>
		<label>
			My email:
			<input type="text" name="email" value={email} disabled />
		</label>
	</Row>

	<Row>
		<label>
			My username:
			<input type="text" name="username" bind:value={username} />
		</label>
	</Row>

	<Row>
		<label>
			Password:
			<input type="password" name="password" bind:value={password} />
		</label>
	</Row>

	<Row>
		<label>
			Password (repeat):
			<input type="password" name="password2" bind:value={password2} />
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
