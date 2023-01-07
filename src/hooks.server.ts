import { error, type Handle } from '@sveltejs/kit'

import { can } from '$can'
import { prisma } from '$lib/prisma/clients'
import { hashUserPassword } from '$lib/prisma/middlewares'
import { routes } from './routes/v2/guard'
import { sequence } from '@sveltejs/kit/hooks'
import { log } from './hooks/log'
import { localAuth } from './hooks/localAuth'
import { dev } from '$app/environment'

prisma.$use(hashUserPassword)

const guard: Handle = async ({ event, resolve }) => {
	if (!event.route.id?.startsWith('/v2')) return resolve(event) // TODO: remove after V2 complete
	if (!event.route.id || event.route.id in routes) return resolve(event)
	throw error(401, `Missing route guard declaration for "${event.route.id}"`)
}

const localPrisma: Handle = async ({ event, resolve }) => {
	event.locals.prisma = prisma
	return resolve(event)
}

const localCan: Handle = async ({ event, resolve }) => {
	event.locals.can = can
	return resolve(event)
}

const hooks = [
	//
	guard,
	localPrisma,
	localCan,
	localAuth,
	...(dev ? [log] : []),
]

export const handle = sequence(...hooks)
