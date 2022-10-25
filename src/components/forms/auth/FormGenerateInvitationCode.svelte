<script lang="ts" scope="module">
	import type { FormError } from '$lib/validators'

	import { dev } from '$app/environment'
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import Errors from '../Errors.svelte'

	let errors: FormError[] = []

	let email = dev ? 'tom@example.com' : ''
	let code = ''
	let copied = false

	$: invitationHref = `${$page.url.origin}/auth/invite/${code}`
</script>

<form
	class="flex h-full flex-col space-y-4"
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
	{#if !code && !copied}
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
			<textarea>{invitationHref}</textarea>
			<button
				class="btn"
				on:click={() => {
					navigator.clipboard.writeText(invitationHref)
					code = ''
					copied = true
				}}
			>
				Copy to clipboard
			</button>
		</div>
	{/if}

	{#if copied}
		<div class="grid gap-4">
			<p>Link copied to the clipboard!</p>
			<p>You can now paste the secret link in a message and send it to the person.</p>
			<button class="btn" on:click={() => (copied = false)}>Ok</button>
		</div>
	{/if}
</form>
