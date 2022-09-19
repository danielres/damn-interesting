<script lang="ts" scope="module">
	import type { FormError } from '$lib/validators'

	export let errors: FormError[] = []
</script>

<ul class="errors">
	{#each errors as error}
		<li>
			{#if error.field}
				<b>{error.field}:</b>
			{/if}

			{error.message}
		</li>
	{/each}
</ul>

<style>
	ul.errors {
		background: rgba(255, 0, 0, 0.116);
		padding: 0.75em 1em;
		margin: 0;
		color: rgba(138, 0, 0, 0.712);
		list-style: none;
		font-size: small;
		font-family: sans-serif;
	}

	ul.errors > li {
		margin-bottom: 0.25em;
	}

	ul.errors > li:last-child {
		margin-bottom: 0;
	}
</style>
