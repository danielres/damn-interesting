import type { YoutubeVideoDetails } from '$lib/Entry/types'
type ID = string

export type CurrentUserView = null | {
	id: string
	email: string
	username: string
	slug: string
	inviter: null | {
		username: string
		slug: string
	}
	invitedAt: Date
}

export type EntryView = {
	id: ID
	url: string
	description: string
	createdAt: Date
	owner: {
		username: string
		slug: string
	}
} & YoutubeVideoDetails

export type InvitationObject = {
	email: string
	invitedAt: string
	inviterId: ID
}
