import { getFormEntriesFromRequest } from '$lib/request'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ locals, request }) => {
	const { q } = await getFormEntriesFromRequest(request)
	const tags = await locals.prisma.tag.findMany({
		where: { name: { contains: q } },
	})
	const names = tags.map((t) => t.name)
	const startingWith = names.filter((name) => name.startsWith(q))
	const notStartingWith = q.length > 2 ? names.filter((name) => !name.startsWith(q)) : []
	const all = [...startingWith, ...notStartingWith]

	return new Response(JSON.stringify(all))
}
