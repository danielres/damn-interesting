<script lang="ts">
	import { fade } from 'svelte/transition'

	export let type: 'warning' | 'success' | undefined = undefined
</script>

<div class="{type} alert " transition:fade>
	<slot />
</div>

<style lang="postcss">
	.alert {
		@apply rounded border-4 text-sm;
		@apply px-3 py-2;
	}

	.warning {
		@apply bg-red-200  border-red-300 text-red-600;
	}

	.success {
		@apply bg-green-300  border-green-400 text-green-800;
	}
</style>
