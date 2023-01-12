<script lang="ts">
	import Icon from '$components/Icon.svelte'
</script>

<button
	class="rounded-full bg-slate-500/40 p-1 text-slate-900 transition-colors hover:bg-slate-500/100"
	on:click
	title="Close dialog (Esc)"
>
	<Icon type="close" class="h-5 w-5" />
</button>
