<script lang="ts" scope="module">
	import { to } from '$paths'
	import { writable } from 'svelte/store'
	import Errors from '$components/forms/Errors.svelte'

	const form = writable({ email: '', password: '' })
	let error: { message: string } | undefined

	const onSubmit = async () => {
		const body = JSON.stringify($form)
		const response = await fetch(to.auth.signin(), { method: 'POST', body })
		response.ok ? window.location.reload() : (error = await response.json())
	}
</script>

<form
	class="grid gap-4"
	method="POST"
	action={to.auth.signin()}
	on:submit|preventDefault={onSubmit}
>
	<label>
		<span>Email</span>
		<input type="email" placeholder="email" bind:value={$form.email} />
	</label>

	<label>
		<span>Password</span>
		<input type="password" placeholder="password" bind:value={$form.password} />
	</label>

	{#if error}
		<Errors errors={[error]} />
	{/if}

	<div>
		<button class="btn" type="submit">Submit</button>
	</div>
</form>
