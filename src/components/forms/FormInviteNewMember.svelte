<script lang="ts" scope="module">
	import type { FormError } from '$lib/validators'
	import { page } from '$app/stores'

	import { dev } from '$app/env'
	import Errors from './Errors.svelte'
	import Row from './Row.svelte'

	let email = dev ? 'tom@example.com' : ''
	let code = ''
	let errors: FormError[] = []

	$: invitationHref = `${$page.url.origin}/auth/invite/${code}`

	const truncate = (string: string) => string.substring(0, 75) + '...'

	const copyToClipboard = (text: string) => {
		window.prompt('Copy to clipboard: Ctrl+C, Enter', text)
	}

	const onSubmit = async () => {
		errors = []
		const response = await fetch('/auth/invite', {
			method: 'POST',
			body: JSON.stringify({ email }),
		})

		if (response.ok) code = await response.json()
		if (!response.ok) errors = await response.json()
	}
</script>

<form method="POST" on:submit|preventDefault={onSubmit}>
	<Row>
		<input type="email" name="email" placeholder="email" bind:value={email} />
	</Row>

	<Row>
		<button>Get invitation link</button>
	</Row>

	{#if errors.length > 0}
		<Row>
			<Errors {errors} />
		</Row>
	{/if}

	{#if code}
		<hr />
		<p>Invitation link for <b>{email}</b>:</p>
		<p class="invitation-link-preview">
			{truncate(invitationHref)}
		</p>
		<button on:click={() => copyToClipboard(invitationHref)}>Copy to clipboard</button>
	{/if}
</form>

<style>
	.invitation-link-preview {
		color: gray;
		font-size: small;
		font-family: sans-serif;
	}
</style>
