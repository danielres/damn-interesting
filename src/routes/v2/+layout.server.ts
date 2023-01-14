import type { LayoutServerLoad } from './$types'

import guard from './guard.server'

export const load = (async ({ locals, route, request }) => {
	guard(route.id, locals.user, request.method)
	return { user: locals.user }
}) satisfies LayoutServerLoad
