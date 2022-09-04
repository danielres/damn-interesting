export type User = {
	id: string
	email: string
	password: string
	username: string
	emailVerifiedAt?: string
	invitedAt?: string
	invitedBy?: string
}

export type Entry = {
	id: string
	ownerId: string
	url: string
	description?: string
	createdAt?: string
}
