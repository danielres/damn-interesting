<script lang="ts" scope="module">
	import type { FormError } from '$lib/validators'

	import { dev } from '$app/environment'
	import { enhance } from '$app/forms'
	import Errors from '$components/forms/Errors.svelte'
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
	class="grid gap-4"
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
	<div>
		<label>
			<div>My email</div>
			<input type="text" name="email" value={email} disabled />
		</label>
	</div>

	<div>
		<label>
			<div>My username</div>
			<input type="text" name="username" bind:value={username} />
		</label>
	</div>

	<div>
		<label>
			<div>Password</div>
			<input type="password" name="password" bind:value={password} />
		</label>
	</div>

	<div>
		<label>
			<div>Password (repeat)</div>
			<input type="password" name="password2" bind:value={password2} />
		</label>
	</div>

	<div>
		<label class="flex gap-4 items-center">
			<input type="checkbox" bind:checked={isCodeOfConductApproved} />
			<div>I have read the code of conduct, and I am a decent and nice human being.</div>
		</label>
	</div>

	{#if errors.length > 0}
		<div>
			<Errors {errors} />
		</div>
	{/if}

	<div class="text-center">
		<button class="btn" disabled={!isCodeOfConductApproved}>Create my account</button>
	</div>
</form>
