<script lang="ts" scope="module">
	import type { PageData } from './$types'

	import { goto } from '$app/navigation'
	import FormSignIn from '$components/forms/auth/FormSignIn.svelte'
	import FormSignupWithCode from '$components/forms/auth/FormSignupWithCode.svelte'

	export let data: PageData

	let isEmailCorrect: boolean | undefined = undefined
	let step = 0
</script>

<div class="card max-w-2xl mx-auto my-12 ">
	<div class="grid gap-4">
		{#if step === 0}
			<div class="grid gap-8 mx-auto text-center py-8">
				<h4>
					<div>Welcome!</div>
					<div>You have been invited by {data.inviter.username}.</div>
				</h4>
				<div>
					<button class="btn" on:click={() => (step = 1)}>
						Accept my invitation and create an account
					</button>
				</div>
				<div>
					<button
						class="hover:underline underline-offset-4 opacity-60 hover:opacity-100 transition-opacity"
						on:click={() => goto('/')}
					>
						Cancel
					</button>
				</div>
			</div>
		{/if}

		{#if 0 < step && step < 3}
			<div>
				<button
					class="hover:underline underline-offset-4 opacity-60 hover:opacity-100 transition-opacity"
					on:click={() => (step = Math.floor(step - 1))}
				>
					Back
				</button>
			</div>
		{/if}

		{#if step === 1}
			<div class="grid gap-4 mx-auto py-8 max-w-md">
				<h4>1. Please confirm that your email is correct</h4>
				<label>
					<input
						on:click={() => (step = 2)}
						type="radio"
						bind:group={isEmailCorrect}
						value={true}
					/>
					<div>
						My email is indeed <b>{data.email}</b>
					</div>
				</label>
				<label>
					<input
						on:click={() => (step = 1.1)}
						type="radio"
						bind:group={isEmailCorrect}
						value={false}
					/>
					<div>
						Oopsie! My email is <u>NOT</u>
						<b>{data.email}</b>
					</div>
				</label>
			</div>
		{/if}

		{#if step === 1.1}
			<div class="grid gap-4 mx-auto py-8 max-w-md">
				<p>
					Please contact <b>{data.inviter.username}</b>
					 and ask them to create a new invitation for you with your correct email.
				</p>
			</div>
		{/if}

		{#if step === 2}
			<div class="grid gap-4 mx-auto py-8 max-w-md">
				<h4>2. Last steps!</h4>
				<FormSignupWithCode code={data.code} email={data.email} onSuccess={() => (step = 3)} />
			</div>
		{/if}

		{#if step === 3}
			<div class="grid gap-6 mx-auto text-center py-8">
				<div class="grid gap-4">
					<h4>Welcome!</h4>
					<p>You can now sign in with your email and password.</p>
				</div>

				<FormSignIn email={data.email} onSuccess={() => goto('/')} />
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	h4 {
		@apply text-xl;
	}

	label {
		@apply flex gap-3 items-center;
	}
</style>
