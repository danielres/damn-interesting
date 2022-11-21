<script lang="ts">
	import type { PageData } from './$types'

	import Entries from '$components/Entries.svelte'
	import ButtonSubmitContentWithModal from '$components/ButtonSubmitContentWithModal.svelte'
	export let data: PageData
</script>

<div class="mx-auto grid max-w-7xl gap-4 py-2 px-2 sm:px-8 ">
	<ButtonSubmitContentWithModal />

	<Entries entries={data.entries} />
</div>
