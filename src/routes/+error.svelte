<script lang="ts">
	import '../app.postcss'

	import { page } from '$app/stores'
	import { HTTP_CODES } from '$constants'
	import FormSignIn2 from './v2/auth/FormSignIn2.svelte'
</script>

<div class="my-16 mx-auto max-w-md rounded border-black bg-slate-700  p-8">
	{#if $page.status === HTTP_CODES.UNAUTHORIZED}
		<FormSignIn2 />
	{:else}
		<h2 class="text-lg">Something went wrong</h2>
		<h1>Error {$page.status}: {$page.error?.message}</h1>
	{/if}
</div>
