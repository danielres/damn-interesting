import type { PrismaClient } from '@prisma/client'

export type Can = ReturnType<typeof can>

export const can = (prisma: PrismaClient) => {
	return {
		signup: async () => (await prisma.user.count()) === 0,
		replay: async () => (await prisma.user.count()) === 0,
	}
}
