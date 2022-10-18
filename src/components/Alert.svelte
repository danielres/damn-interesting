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
		@apply border-red-300  bg-red-200 text-red-600;
	}

	.success {
		@apply border-green-400  bg-green-300 text-green-800;
	}
</style>
