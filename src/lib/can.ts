import type { PrismaClient } from '@prisma/client'
import type { EntryView } from '$types'

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

	replay: async (prisma: PrismaClient) => {
		if (!browser) return (await prisma.user.count()) === 0
		throw backendOnlyAbilityError
	},

	updateEntry: (user: App.Locals['user'] | null, entry: EntryView | null) => {
		if (!user || !entry) return false
		if (user.role === USER_ROLES.SUPERADMIN) return true
		if (entry.owner.slug === user.slug) return true
		return false
	},
}
