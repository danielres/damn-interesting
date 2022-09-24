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

<header>
	<div>
		<h1 class="text-xl">
			<a href="/">Damn Interesting</a>
		</h1>
	</div>

	{#if $userStore}
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
	{/if}
</header>

<main class="fade-in">
	{#if $userStore}
		<slot />
	{:else}
		<div class="wrapper">
			<div class="columns">
				<div>
					<h4>Sign in</h4>
					<FormSignIn />
				</div>
				<div>
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

<style>
	header {
		padding: 1em;
		display: flex;
		justify-content: space-between;
		background: #eee;
		margin-bottom: 1em;
		align-items: baseline;
	}

	main {
		margin: 1em;
	}

	.wrapper {
		display: flex;
		justify-content: center;
	}

	.columns {
		display: flex;
	}

	.columns > div {
		flex: 1;
		padding: 0 2em;
	}
</style>