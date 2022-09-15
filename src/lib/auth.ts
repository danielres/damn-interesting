import '../app.postcss'

import { browser } from '$app/env'
import { get } from 'svelte/store'
import { userStore } from '../stores/user'

export const attemptAuthRestore = async () => {
	if (!browser) return
	if (get(userStore)) return
	const response = await fetch('/auth/restore', { method: 'POST' })
	if (!response.ok) return
	const result = await response.json()
	userStore.set(result)
}

export const signOut = async () => {
	if (!browser) return
	const response = await fetch('/auth/signout', { method: 'POST' })
	if (!response.ok) return
	userStore.set(undefined)
}
