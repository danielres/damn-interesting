<script scope="module" lang="ts">
	import type { LayoutData } from './$types'

	import '../../app.postcss'

	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import FormSignIn from '$components/forms/auth/FormSignIn.svelte'
	import FormSignUp from '$components/forms/auth/FormSignUp.svelte'
	import { userStore } from '$stores/user'

	export let data: LayoutData

	$userStore = data.user

	let signupSuccess = false
	const onSignupSuccess = () => (signupSuccess = true)

	let isAdmin = false
	$: isAdmin = $page.url.pathname.startsWith('/admin')
</script>

{#if $userStore}
	<header class={`flex ${isAdmin ? 'bg-red-900/50' : 'bg-slate-900'} px-8 py-4 items-baseline`}>
		<h1 class="text-xl flex-grow">
			<a href="/" class="drop-shadow-sharp hover:text-white transition-colors">Damn Interesting</a>
		</h1>

		<div class="ml-auto flex space-x-8">
			<a class="hover:underline underline-offset-4 hover:text-white transition-colors" href="/me"
				>{$userStore.username}
			</a>

			<form
				class="inline-block"
				use:enhance={() => () => ($userStore = undefined)}
				action="/auth?/signout"
				method="POST"
			>
				<button type="submit">
					<span class="hover:underline underline-offset-4 hover:text-white transition-colors"
						>Sign out</span
					></button
				>
			</form>
		</div>
	</header>
{/if}

<main>
	{#if $userStore}
		<slot />
	{:else}
		<div class="grid content-center px-8 py-24 max-w-2xl mx-auto">
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
		@apply text-xl mb-6 border-b-2 pb-1 border-slate-400/50;
	}
</style>
