import type { Entry, PrismaClient, User } from '@prisma/client'

import { browser } from '$app/environment'
import { USER_ROLES } from '$constants'

export type Can = typeof can

// Note: certain abilities (ex: depending on prisma) can only be resolved in the backend
const backendOnlyAbilityError = new Error('This ability can only be resolved on the backend')

export const can = {
	signup: async (prisma: PrismaClient) => {
		if (!browser) return (await prisma.user.count()) === 0
		throw backendOnlyAbilityError
	},

	updateEntry: (user: Pick<User, 'role' | 'id'> | null, entry: Pick<Entry, 'ownerId'> | null) => {
		if (!user || !entry) return false
		if (user.role === USER_ROLES.SUPERADMIN) return true
		if (entry.ownerId === user.id) return true
		return false
	},

	sendTelegramMessage: (user: Pick<User, 'role'> | null) => {
		if (!user) return false
		if (user.role === USER_ROLES.SUPERADMIN) return true
		return false
	},
}
