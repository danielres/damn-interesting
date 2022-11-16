import type { Handle } from '@sveltejs/kit'

import { can } from '$can'
import { Cache } from '$lib/cache'
import { decryptObject } from '$lib/encryption'
import { prisma } from '$lib/prisma/clients'
import { hashUserPassword } from '$lib/prisma/middlewares'

prisma.$use(hashUserPassword)

const userCache = new Cache('user', 10, 30)

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.prisma = prisma
	event.locals.can = can

	const encryptedSession = event.cookies.get('session')
	if (!encryptedSession) return resolve(event)

	let dbUser

	if (userCache.get(encryptedSession)) {
		dbUser = userCache.get(encryptedSession)
	} else {
		const { userId } = decryptObject(encryptedSession)

		dbUser = await prisma.user.findFirst({
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
	}

	userCache.set(encryptedSession, dbUser)
	event.locals.user = dbUser

	return resolve(event)
}
