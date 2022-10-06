import { onDestroy } from 'svelte'

// To be used in svelte components, with cleanup baked-in (prevents memory leaks)

export const onInterval = (callback: () => void, milliseconds: number) => {
	const interval = setInterval(callback, milliseconds)
	onDestroy(() => clearInterval(interval))
}
