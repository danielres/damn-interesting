import '../app.postcss'

import { browser } from '$app/environment'
import { userStore } from '../stores/user'

export const signOut = async () => {
	if (!browser) return
	const response = await fetch('/auth/signout', { method: 'POST' })
	if (!response.ok) return
	userStore.set(undefined)
}
