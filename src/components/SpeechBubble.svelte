<script lang="ts">
	import colors from 'tailwindcss/colors'

	export let color: string = colors.slate[600]

	let _class = ''
	export { _class as class }
</script>

<div class="bubble {_class}" style="--color: {color}">
	<slot />
</div>

<style lang="postcss">
	.bubble {
		@apply relative rounded-lg;
		background: var(--color);

		&:after {
			content: '';
			@apply absolute bottom-0 right-10 -mb-3 h-0 w-0;
			position: absolute;
			border: 1rem solid transparent;
			border-top-color: var(--color);
			border-bottom: 0;
			border-left: 0;
		}
	}
</style>
