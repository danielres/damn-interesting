<script lang="ts" scope="module">
	import type { FormError } from '$lib/validators'

	import { fade } from 'svelte/transition'

	export let errors: FormError[] = []
</script>

<ul class="errors" transition:fade>
	{#each errors as error}
		<li>
			{#if error.field}
				<b>{error.field}:</b>
			{/if}

			{error.message}
		</li>
	{/each}
</ul>

<style lang="postcss">
	ul.errors {
		@apply bg-red-200 rounded border-4 border-red-300;
		@apply text-red-600 text-sm;
		@apply px-3 py-2;
		@apply grid gap-1;
	}
</style>
