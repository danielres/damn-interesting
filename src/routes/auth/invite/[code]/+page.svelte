<script lang="ts" scope="module">
	import FormSignIn from '../../../../components/forms/auth/FormSignIn.svelte'
	import type { PageData } from './$types'
	import FormRegister from './FormRegister.svelte'
	import { goto } from '$app/navigation'

	export let data: PageData

	let isEmailCorrect: boolean | undefined = undefined
	let step = 0
</script>

{#if step === 0}
	<h3>Welcome! You have been invited by <b>{data.invitedBy.username}</b>.</h3>
	<button on:click={() => (step = 1)}>Accept my invitation and create an account</button>
{/if}

{#if 0 < step && step < 3}
	<button on:click={() => (step = Math.floor(step - 1))}>Back</button>
{/if}

<button on:click={() => goto('/')}>Cancel</button>

{#if step === 1}
	<h4>1. Please verify that your email is correct</h4>
	<div>
		<div>
			<label>
				<input on:click={() => (step = 2)} type="radio" bind:group={isEmailCorrect} value={true} />
				My email is indeed <b>{data.email}</b>
			</label>
		</div>
		<div>
			<label>
				<input
					on:click={() => (step = 1.1)}
					type="radio"
					bind:group={isEmailCorrect}
					value={false}
				/>
				Oopsie! My email is NOT <b>{data.email}</b>
			</label>
		</div>
	</div>
{/if}

{#if step === 1.1}
	<div>
		Please contact <b>{data.invitedBy.username}</b> and ask them to create a new invitation for you with
		your correct email
	</div>
{/if}

{#if step === 2}
	<h4>2. Last steps!</h4>
	<FormRegister code={data.code} email={data.email} onSuccess={() => (step = 3)} />
{/if}

{#if step === 3}
	<h4>Welcome!</h4>
	<p>You can now sign in with your email and password</p>

	<FormSignIn email={data.email} onSuccess={() => goto('/')} />
{/if}
