<script>
	import { entries } from '../data'
</script>

{#each entries as entry}
	<div>{entry.url}</div>
{/each}
