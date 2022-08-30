<script scope="module">
	import FormSignIn from '../components/forms/auth/FormSignIn.svelte'
	import FormSignUp from '../components/forms/auth/FormSignUp.svelte'
	import { userStore } from '../stores/user'
	const signOut = () => ($userStore = undefined)

	let signupSuccess = false
	const onSignupSuccess = () => (signupSuccess = true)
</script>

{#if $userStore}
	<header>
		<div>
			<h1>
				<a href="/"> Damn Interesting </a>
			</h1>
		</div>

		<div>
			<a href="/profile">
				{$userStore.username}
			</a>
			<button on:click={signOut}>Sign out</button>
		</div>
	</header>

	<main>
		<slot />
	</main>
{:else}
	<h2>Damn Interesting!</h2>

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

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}

	header {
		padding: 1em;
		display: flex;
		justify-content: space-between;
		background: #eee;
		margin-bottom: 1em;
		align-items: baseline;
	}

	header h1 {
		line-height: 1;
		margin: 0;
		padding: 0;
		font-size: larger;
		font-weight: normal;
	}

	main {
		margin: 1em;
	}
	h2 {
		text-align: center;
		font-weight: normal;
	}

	h4 {
		font-weight: normal;
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
