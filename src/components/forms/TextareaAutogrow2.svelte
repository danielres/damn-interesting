<script lang="ts">
	export let id: string
	export let name: string
	export let placeholder = ''
	export let value: string | undefined = ''

	let _class = 'p-0'
	export { _class as class }
</script>

<div class="auto-grow">
	<textarea class={_class} {name} {id} bind:value {placeholder} />
	<div class="replicated {_class}">{value + ' '}</div>
</div>

<style lang="postcss">
	.auto-grow {
		display: grid;

		textarea {
			resize: none;
			overflow: hidden;
		}

		.replicated {
			/* white-space: pre-wrap; */
			visibility: hidden;
		}

		textarea,
		.replicated {
			@apply whitespace-pre-wrap break-words;
			grid-area: 1 / 1 / 2 / 2; /* Place on top of each other */
		}
	}
</style>
