import type { CurrentUserView } from '../db/types'

import { writable } from 'svelte/store'

export const userStore = writable<CurrentUserView | undefined>(undefined)
