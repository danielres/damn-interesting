<script lang="ts">
	import { browser } from '$app/environment'
	import { onDestroy } from 'svelte'
	import { portal } from '$lib/actions/portal'
	import ButtonClose from '$components/Modal2/ButtonClose.svelte'

	let _class = 'bg-slate-700 p-8 rounded border border-black shadow-lg'
	export { _class as class }

	export let isOpen = false
	export let onClose = () => {}
	export let open = () => (isOpen = true)

	const close = () => {
		isOpen = false
		onClose()
	}

	const clipBody = (clip: boolean) => {
		if (!browser) return
		const body = document.querySelector('body')
		clip ? body?.classList.add('clipped') : body?.classList.remove('clipped')
	}

	$: {
		if (browser && isOpen) clipBody(true)
		if (browser && !isOpen) clipBody(false)
	}

	onDestroy(() => clipBody(false))
</script>

<svelte:window
	on:keydown={({ key }) => {
		if (isOpen && key === 'Escape') close()
	}}
/>

<slot {open} {close} />

{#if isOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		use:portal
		on:click|self={close}
		class="modal fixed inset-0 flex cursor-pointer items-center justify-center bg-slate-900/70 backdrop-blur"
	>
		<div class="max-h-full cursor-default overflow-y-auto">
			<div class="relative  {_class}">
				<slot name="actions">
					<div class="absolute top-2 right-2">
						<ButtonClose on:click={close} />
					</div>
				</slot>

				<slot name="main" />
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	:global(body.clipped) {
		overflow: hidden;
	}
</style>
