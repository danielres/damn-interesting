import type { YoutubeVideoDetails } from '$lib/Entry/types'
import type { User } from '@prisma/client'
import type { Readable } from 'svelte/store'
import type { z } from 'zod'
import type * as schemas from './schemas.server'

import { page } from '$app/stores'
import { getYoutubeGetVideoDetails } from '$lib/Entry/youtube'
import { capitalizeFirst } from '$lib/string'
import { derived, writable } from 'svelte/store'
import { invalidateAll } from '$app/navigation'

type Values = z.infer<typeof schemas.newEntry>
type ValuesWithOwner = Values & { owner: Pick<User, 'slug' | 'username'> }

export const url = writable('')
export const youtubeVideoDetails = writable<YoutubeVideoDetails | undefined>(undefined)
export const values = writable<Partial<Values>>({})

const resetUrl = () => url.set('')
const resetYoutubeVideoDetails = () => youtubeVideoDetails.set(undefined)
const resetValues = () => values.set({})

export const resetAll = () => {
	resetUrl()
	resetYoutubeVideoDetails()
	resetValues()
	invalidateAll() // Resets $page.form.errors
}

url.subscribe(async ($url) => {
	try {
		youtubeVideoDetails.set(await getYoutubeGetVideoDetails($url))
	} catch (error) {
		resetYoutubeVideoDetails()
	}
})

youtubeVideoDetails.subscribe(($details) => {
	if ($details) values.update(($values) => ({ ...$values, ...$details }))
})

values.subscribe(($values) => {
	$values.description = $values.description?.trimStart()
	$values.description = $values.description?.replaceAll('<', '')
	$values.description = $values.description?.replaceAll('>', '')
	$values.description = capitalizeFirst($values.description)
})

export const newEntryPreview: Readable<Partial<ValuesWithOwner>> = derived(
	[page, values],
	([$page, $values]) => {
		return {
			...$values,
			createdAt: new Date(),
			taggings: $values.tags?.map((t) => ({ tag: { name: t } })),
			owner: {
				slug: $page.data.user.slug,
				username: $page.data.user.username,
			},
		}
	}
)

// DEV TOOLS ---

export const devResourceIds = [
	'ey18AZjYERY',
	'uSj5M4tCdvc',
	'cHHw_9tGC7w',
	'iKAVRgIrUOU',
	'KPoeNZZ6H4s',
	'GojYJcoqvOU',
	'gEOa793e_dU',
	'hShxsAlJmfw',
	'yhCuCqJbOVE',
	'aGF72UFwyKw',
	'LhOSM6uCWxk',
]
