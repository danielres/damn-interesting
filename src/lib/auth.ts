import { userStore } from '$stores/user'
import { get } from 'svelte/store'

export const renew = async () => {
	if (!get(userStore)) return

	const response = await fetch('/auth?/renew', { method: 'POST', body: new FormData() })
	const { type } = await response.json()

	if (type !== 'success') userStore.set(undefined)
}
