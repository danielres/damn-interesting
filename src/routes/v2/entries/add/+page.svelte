<script lang="ts">
	import type { ActionData } from './$types'

	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Modal from '$components/Modal2.svelte'
	import { to } from '$paths'
	import FormEntryAdd from './components/FormEntryAdd.svelte'

	export let form: ActionData

	const onModalClose = () => goto(to.entries() + $page.url.search, { noScroll: true })
</script>

<Modal
	class="justify-center rounded border border-black bg-slate-600 p-4 max-sm:w-[100vw] sm:p-6"
	isOpen={true}
	onClose={onModalClose}
>
	<svelte:fragment slot="main">
		<FormEntryAdd {form} />
	</svelte:fragment>
</Modal>
