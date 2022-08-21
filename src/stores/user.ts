import { writable } from 'svelte/store'
import type { User } from '../data'

export const userStore = writable<User | undefined>(undefined)
