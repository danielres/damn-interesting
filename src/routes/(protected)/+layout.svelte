<script scope="module" lang="ts">
	import type { LayoutData } from './$types'

	import '../../app.postcss'

	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import FormSignIn from '$components/forms/auth/FormSignIn.svelte'
	import FormSignUp from '$components/forms/auth/FormSignUp.svelte'
	import { COOKIES } from '$constants'
	import { onInterval } from '$lib/interval'
	import * as auth from '$lib/auth'
	import { userStore } from '$stores/user'
	import { onMount } from 'svelte'

	export let data: LayoutData

	$userStore = data.user

	let signupSuccess = false
	const onSignupSuccess = () => (signupSuccess = true)

	let isAdmin = false
	$: isAdmin = $page.url.pathname.startsWith('/admin')

	onMount(() => (document.onfocus = auth.renew))
	onInterval(auth.renew, (COOKIES.session.maxAge * 1000) / 3)
</script>

<div class="flex h-screen flex-col">
	{#if $userStore}
		<header class=" {isAdmin ? 'bg-red-900/50' : 'bg-slate-900'} flex px-6 py-4 sm:px-8">
			<h1 class="">
				<a href="/" class="flex gap-2 drop-shadow-sharp transition-colors hover:text-white">
					<svg
						class="h-8 w-8 self-end opacity-70"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							style="fill:none;stroke-width:1.42247;stroke-dasharray:none;stroke-opacity:1;stroke-linecap:round;paint-order:markers fill stroke;stroke-linejoin:round"
							d="M3.3 3.4C2 3.4 1 4.4 1 5.6v9.7c0 1.3 1 2.3 2.2 2.3h17.5c1.2 0 2.2-1 2.2-2.3V5.6c0-1.2-1-2.2-2.2-2.2H3.3zM9.6 6l3.7 2.2 3.8 2.2-3.8 2.1-3.7 2.2V6.1zM12 19a1.6 1.6 0 0 0-1.5 1.6 1.6 1.6 0 0 0 1.5 1.5 1.6 1.6 0 0 0 1.6-1.5A1.6 1.6 0 0 0 12 19zm-9.7 1.6H10 2.3zm11.8 0h7.7H14z"
						/>
					</svg>

					<div class="leading-none">
						<div class="text-sm opacity-70">Damn</div>
						<div>Interesting</div>
					</div>
				</a>
			</h1>

			<div class="ml-auto flex space-x-8 self-end leading-none">
				<a class="nav-link-text" href="/me">{$userStore.username}</a>

				<form
					class="inline-block"
					use:enhance={() => () => ($userStore = undefined)}
					action="/auth?/signout"
					method="POST"
				>
					<button type="submit"><span class="nav-link-text">Sign out</span></button>
				</form>
			</div>
		</header>
	{/if}

	<main>
		{#if $userStore}
			<slot />
		{:else}
			<div class="mx-auto grid max-w-2xl content-center px-8 py-24">
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

	{#if $userStore}
		<footer class="mt-auto bg-slate-900 px-6 py-4 sm:px-8">
			<div class="flex justify-center">
				<a href="/about" class="nav-link-text">About</a>
			</div>
		</footer>
	{/if}
</div>

<style lang="postcss">
	.nav-link-text {
		@apply underline-offset-4 transition-colors hover:text-white hover:underline;
		@apply drop-shadow-sharp;
	}
	h4 {
		@apply mb-6 border-b-2 border-slate-400/50 pb-1 text-xl;
	}
</style>
