<script scope="module">
	import Entry from '../../../components/Entry.svelte'
	export let data
	const { entries, user } = data
</script>

<h1>{user.username}</h1>

<div class="flex justify-center">
	<div class="entries">
		{#each entries as entry}
			<Entry {entry} />
		{/each}
	</div>
</div>

<style lang="postcss">
	h1 {
		@apply text-2xl text-center;
	}
</style>
