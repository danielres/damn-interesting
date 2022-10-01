<script lang="ts" scope="module">
	import { page } from '$app/stores'
	import type { FormError } from '$lib/validators'

	import { dev } from '$app/environment'
	import { enhance } from '$app/forms'
	import Errors from '../Errors.svelte'

	let email = dev ? 'tom@example.com' : ''
	let code = ''
	let errors: FormError[] = []

	$: invitationHref = `${$page.url.origin}/auth/invite/${code}`

	const copyToClipboard = (text: string) => {
		window.prompt('Copy to clipboard: Ctrl+C, Enter', text)
		code = ''
	}
</script>

<form
	class="flex flex-col space-y-4 h-full"
	method="POST"
	action="/auth?/generate-invitation-code"
	use:enhance={() => {
		return ({ result }) => {
			errors = []
			if (result.type === 'success') code = result.data?.code
			if (result.type === 'invalid') errors = result.data?.errors
			if (result.type === 'error') errors = [result.error]
		}
	}}
>
	{#if !code}
		<div>
			<input type="email" name="email" placeholder="email" bind:value={email} />
		</div>

		<div>
			<button class="btn">Get invitation link</button>
		</div>

		{#if errors.length > 0}
			<div>
				<Errors {errors} />
			</div>
		{/if}
	{/if}

	{#if code}
		<div class="grid gap-4">
			<p>Invitation link generated!</p>
			<button class="btn" on:click={() => copyToClipboard(invitationHref)}>
				Copy to clipboard
			</button>
		</div>
	{/if}
</form>
