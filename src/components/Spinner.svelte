<script lang="ts">
	import Icon from '$components/Icon.svelte'

	let _class = 'h-5 w-5 text_white'
	export { _class as class }
</script>

<Icon type="spinner" class=" animate-spin {_class}" />
