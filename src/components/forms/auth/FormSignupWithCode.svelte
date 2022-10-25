<script lang="ts" scope="module">
	import type { FormError } from '$lib/validators'

	import { dev } from '$app/environment'
	import { enhance } from '$app/forms'
	import Errors from '$components/forms/Errors.svelte'
	import * as validators from '$lib/validators'
	import zxcvbn from 'zxcvbn'

	export let onSuccess: () => void
	export let code: string
	export let email: string

	let username: string = dev ? email.split('@')[0] : ''
	let password: string = dev ? 'pass' : ''
	let password2: string = dev ? 'pass' : ''

	$: pwCheck = zxcvbn(password)
	$: percents = (pwCheck.score === 0 ? 0.5 : pwCheck.score) * 25

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
		<div
			style="width: {percents}%"
			class="mt-1 h-1 rounded-full transition-all {!password && 'h-0'} {pwCheck.score === 0
				? 'bg-red-600'
				: pwCheck.score === 1
				? 'bg-red-400'
				: pwCheck.score === 2
				? 'bg-orange-600'
				: pwCheck.score === 3
				? 'bg-emerald-600'
				: 'bg-green-600'}"
		/>
		{#if pwCheck.feedback.warning}
			<ul class="text-sm opacity-70">
				<li><b>{pwCheck.feedback.warning}</b></li>
			</ul>
		{/if}

		{#if pwCheck.feedback.suggestions}
			<ul class="text-sm opacity-70">
				{#each pwCheck.feedback.suggestions as suggestion}
					<li>{suggestion}</li>
				{/each}
			</ul>
		{/if}
	</div>

	<div>
		<label>
			<div>Password (repeat)</div>
			<input type="password" name="password2" bind:value={password2} />
		</label>
	</div>

	<div>
		<label class="flex items-center gap-4">
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
		<button class="btn" disabled={!isCodeOfConductApproved || pwCheck.score < 3}>
			Create my account
		</button>
	</div>
</form>
