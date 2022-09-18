import type { YoutubeVideoDetails } from '$lib/Entry/types'

type ID = string
type Date = string

export type UserDbRecord = {
	id: ID
	username: string
	email: string
	password: string
	slug: string
	invitedAt: Date
	invitedById: ID
}

export type UserFormInput = Pick<UserDbRecord, 'email' | 'username' | 'password'>
export type UserDbInput = UserFormInput &
	Pick<UserDbRecord, 'slug' | 'invitedAt' | 'invitedById'> & { id?: ID }
export type UserView = Pick<UserDbRecord, 'username' | 'slug' | 'invitedAt'> & {
	invitedBy?: Pick<UserDbRecord, 'slug' | 'username'>
}
export type CurrentUserView = UserView & Pick<UserDbRecord, 'email' | 'id'>

export type EntryDbRecord = {
	id: ID
	url: string
	description: string
	ownerId: ID
	createdAt: Date
} & YoutubeVideoDetails

export type EntryFormInput = Pick<EntryDbRecord, 'url' | 'description'>
export type EntryDbInput = Pick<EntryDbRecord, 'url' | 'description' | 'ownerId'>
export type EntryView = Omit<EntryDbRecord, 'ownerId'> & {
	owner: {
		username: string
		slug: string
	}
}

export type InvitationObject = {
	email: string
	invitedAt: Date
	invitedById: ID
}
