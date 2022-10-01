import type { Handle } from '@sveltejs/kit'

import { decryptObject } from '$lib/encryption'
import { hash } from '$lib/password'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.$use(async (params, next) => {
	if (params.model === 'User' && params.action === 'create')
		params.args.data.password = await hash(params.args.data.password)
	return next(params)
})

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.prisma = prisma

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
