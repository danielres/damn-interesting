import type { RequestHandler } from './$types'

import { json } from '@sveltejs/kit'
import guard from '../guard.server'

export const GET: RequestHandler = async ({ locals, request, route, url }) => {
	guard(route.id, locals.user, request.method)

	const q = (url.searchParams.get('q') || '').trim()

	const tags = await locals.prisma.tag.findMany({
		where: { name: { contains: q } },
	})

	const names = tags.map((t) => t.name)
	const startingWith = names.filter((name) => name.startsWith(q))
	const notStartingWith = q.length > 2 ? names.filter((name) => !name.startsWith(q)) : []
	const all = [...startingWith, ...notStartingWith]

	return json(all)
}
