import type { Handle } from '@sveltejs/kit'

import { can } from '$can'
import { decryptObject } from '$lib/encryption'
import { prisma, prisma2 } from '$lib/prisma/clients'
import { hashUserPassword, sourceEvents } from '$lib/prisma/middlewares'

prisma.$use(hashUserPassword)
prisma.$use(sourceEvents)
export const handle: Handle = async ({ event, resolve }) => {
	event.locals.prisma = prisma
	event.locals.prisma2 = prisma2
	event.locals.can = can

	const encryptedSession = event.cookies.get('session')
	if (!encryptedSession) return resolve(event)

	const { userId } = decryptObject(encryptedSession)

	const dbUser = await prisma.user.findFirst({
		where: { id: userId },
		select: {
			id: true,
			email: true,
			username: true,
			role: true,
			slug: true,
			inviter: { select: { username: true, slug: true } },
			invitedAt: true,
		},
	})

	event.locals.user = dbUser

	return resolve(event)
}
