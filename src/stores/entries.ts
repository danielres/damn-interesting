import type { Entry } from '@prisma/client'
import type { EntriesGETResponse } from '../routes/v2/entries/+server'

import { page as pageStore } from '$app/stores'
import * as paths from '$paths'
import { derived, get, writable } from 'svelte/store'
import { error } from '@sveltejs/kit'

export const order = derived(pageStore, ($pageStore) => $pageStore.url.searchParams.get('order'))
export const q = derived(pageStore, ($pageStore) => $pageStore.url.searchParams.get('q'))
export const page = writable(1)
export const entries = writable<EntriesGETResponse>([])
export const newEntriesCount = writable<number | undefined>()

export const loadMore = async () => {
	const apiSearchParams = new URLSearchParams(get(pageStore).url.searchParams)
	apiSearchParams.set('page', String(get(page)))

	const res = await fetch(paths.api.entries() + '?' + apiSearchParams)
	if (!res.ok) throw error(401, 'Loadmore failed')
	const newEntries: EntriesGETResponse = await res.json()
	newEntriesCount.set(newEntries.length)
	entries.update((e) => [...e, ...newEntries])
	page.update((p) => (p = p + 1))
}

export const reload = async () => {
	page.set(1)
	entries.set([])
	newEntriesCount.set(undefined)
	loadMore()
}

export const getEntry = async (id: Entry['id']) => {
	const found = get(entries).find((e) => e.id === id)
	if (found) return found

	return await fetch(paths.api.entry(id)).then((res) => res.json())
}
