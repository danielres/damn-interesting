import { writable } from 'svelte/store'
import type { User } from '../db/types'

export const userStore = writable<User | undefined>(undefined)
