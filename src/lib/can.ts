import { USER_ROLES } from '$constants'
import type { Entry, PrismaClient } from '@prisma/client'
type User = App.Locals['user']

export type Can = ReturnType<typeof can>

export const can = (prisma: PrismaClient) => {
	return {
		signup: async () => (await prisma.user.count()) === 0,

		replay: async () => (await prisma.user.count()) === 0,

		updateEntry: (user: User | null, entry: Entry | null) => {
			if (!user) return false
			if (user.role === USER_ROLES.SUPERADMIN) return true
			if (entry?.ownerId === user.id) return true
			return false
		},
	}
}
