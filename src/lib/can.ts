import type { PrismaClient } from '@prisma/client'

export type Can = (prisma: PrismaClient) => {
	[k: string]: () => Promise<boolean>
}

export const can: Can = (prisma: PrismaClient) => {
	return {
		signup: async () => (await prisma.user.count({})) === 0,
	}
}
