import type { Role } from '@prisma/client'

type ID = string

export type UserView = {
	username: string
	slug: string
	inviter?: UserView
	invitedAt?: Date
}

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
	role: Role
}

export type InvitationObject = {
	email: string
	invitedAt: string
	inviterId: ID
}
