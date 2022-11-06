<script lang="ts">
	export let id: string
	export let name: string
	export let value: string
</script>

<div class="auto-grow">
	<textarea {name} {id} bind:value />
	<span class="replicated">{value + ' '}</span>
</div>

<style lang="postcss">
	.auto-grow {
		display: grid;

		textarea {
			resize: none;
			overflow: hidden;
		}

		.replicated {
			white-space: pre-wrap;
			visibility: hidden;
		}

		textarea,
		.replicated {
			@apply p-0 text-sm;
			grid-area: 1 / 1 / 2 / 2; /* Place on top of each other */
		}
	}
</style>
