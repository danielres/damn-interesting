<script lang="ts">
	export let id: string
	export let name: string
	export let placeholder = ''
	export let value: string
</script>

<div class="auto-grow">
	<textarea class="p-0" {name} {id} bind:value {placeholder} />
	<div class="replicated p-0">{value + ' '}</div>
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
			padding-bottom: 0.5em;
		}

		textarea,
		.replicated {
			@apply leading-snug;
			grid-area: 1 / 1 / 2 / 2; /* Place on top of each other */
		}
	}
</style>
