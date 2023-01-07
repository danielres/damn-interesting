import { invalidateAll } from '$app/navigation'
import type { CurrentUserView } from '$types'

import { writable } from 'svelte/store'

export const userStore = writable<CurrentUserView | undefined>(undefined)

export const signout = () => {
	userStore.set(undefined)
	invalidateAll()
}
