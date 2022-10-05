<script lang="ts">
	import type { FormError } from '$lib/validators'

	import Alert from '$components/Alert.svelte'

	export let errors: FormError[] = []
</script>

<Alert type="warning">
	<ul>
		{#each errors as error}
			<li>
				{#if error.field}
					<b>{error.field}:</b>
				{/if}

				{error.message}
			</li>
		{/each}
	</ul>
</Alert>
