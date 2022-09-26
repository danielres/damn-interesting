import type { CurrentUserView } from '$types'

import { writable } from 'svelte/store'

export const userStore = writable<CurrentUserView | undefined>(undefined)
