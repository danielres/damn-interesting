export type User = {
	id: string
	email: string
	password: string
	username: string
	emailVerifiedAt?: string
	invitedAt?: string
	invitedBy?: string
}

export type EntryInput = {
	ownerId: string
	url: string
	description?: string
	createdAt?: string
}

export type Entry = EntryInput & {
	id: string
	authorName: string
	authorUrl: string
	height: number
	providerName: string
	ratio: number
	resourceId: string
	resourceType: string
	title: string
	thumbnailHeight: number
	thumbnailWidth: number
	thumbnailUrl: string
	width: number
}
