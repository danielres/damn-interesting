<script scope="module" lang="ts">
	import type { PageData } from './$types'

	import Entries from '$components/Entries.svelte'

	export let data: PageData
	$: user = data.user!
</script>

<div class="mx-auto my-12 grid max-w-7xl gap-12  md:p-8">
	<h1>
		<small class="block text-slate-500">Also curated by</small>
		{user.username}
	</h1>

	<Entries entries={data.entries} />
</div>

<style lang="postcss">
	h1 {
		@apply text-center text-2xl;
	}
</style>
