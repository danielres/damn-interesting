<script scope="module" lang="ts">
	import type { LayoutData } from './$types'

	import '../../app.postcss'

	import { enhance } from '$app/forms'
	import FormSignIn from '$components/forms/auth/FormSignIn.svelte'
	import FormSignUp from '$components/forms/auth/FormSignUp.svelte'
	import { userStore } from '$stores/user'

	export let data: LayoutData

	$userStore = data.user

	let signupSuccess = false
	const onSignupSuccess = () => (signupSuccess = true)
</script>

{#if $userStore}
	<header class="bg-slate-500">
		<div>
			<h1 class="text-xl">
				<a href="/">Damn Interesting</a>
			</h1>
		</div>

		<div>
			<a href="/me">
				{$userStore.username}
			</a>
			<form
				use:enhance={() => () => ($userStore = undefined)}
				action="/auth?/signout"
				class="inline"
				method="POST"
			>
				<button type="submit">Sign out</button>
			</form>
		</div>
	</header>
{/if}

<main>
	{#if $userStore}
		<slot />
	{:else}
		<div class="grid content-center min-h-screen p-8 lg:w-1/2 mx-auto">
			<div class="card grid md:grid-cols-2">
				<div class="md:pr-8">
					<h4>Sign in</h4>
					<FormSignIn />
				</div>

				<div class="mt-8 md:mt-0">
					<h4>Sign up</h4>
					{#if signupSuccess}
						<div class="success">
							<p>Almost there!</p>
							<p>Please check your inbox and confirm your email.</p>
						</div>
					{:else}
						<FormSignUp onSuccess={onSignupSuccess} />
					{/if}
				</div>
			</div>
		</div>
	{/if}
</main>

<style lang="postcss">
	h4 {
		@apply text-xl mb-6 border-b-2 border-slate-400/50;
	}
</style>
