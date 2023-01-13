import type { PageServerLoad } from './$types'

import guard from '../../guard.server'

export const load = (async ({ locals, route, request }) => {
	guard(route.id, locals.user, request.method)
}) satisfies PageServerLoad
