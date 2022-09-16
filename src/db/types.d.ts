import type { YoutubeVideoDetails } from '../lib/Entry/types'

export type User = {
	id: string
	email: string
	password: string
	username: string
	emailVerifiedAt?: string
	invitedAt?: string
	invitedBy?: string
}

export type EntryFormInput = {
	url: string
	description: string
}

export type EntryDbInput = EntryFormInput & {
	ownerId: string
	createdAt?: string
}
export type EntryDbRecord = EntryDbInput &
	YoutubeVideoDetails & {
		id: string
	}

export type EntryView = Omit<EntryDbRecord, 'ownerId'> & {
	owner: {
		username: string
	}
}
