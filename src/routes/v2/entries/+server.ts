import type { Prisma, PrismaClient } from '@prisma/client'
import type { RequestHandler } from './$types'
export type EntriesGETResponse = Prisma.PromiseReturnType<typeof getEntries>

import { json } from '@sveltejs/kit'
import guardRoute from '../guard.server'

const PER_PAGE = 9

const getEntries = async (
	prisma: PrismaClient,
	{ order, page, q }: { order: string | null; page: number; q: string }
) =>
	prisma.entry.findMany({
		orderBy: { createdAt: order === 'asc' ? 'asc' : 'desc' },
		where: {
			OR: [
				{ title: { contains: q } },
				{ description: { contains: q } },
				{ taggings: { some: { tag: { name: { contains: q } } } } },
			],
		},
		take: PER_PAGE,
		skip: (page - 1) * PER_PAGE,
		include: {
			owner: { select: { username: true, slug: true } },
			taggings: { include: { tag: { include: { taggings: true } } } },
		},
	})

export const GET: RequestHandler = async ({ locals, url, route, request }) => {
	guardRoute(route.id, locals.user, request.method)

	const order = url.searchParams.get('order')
	const page = parseInt(url.searchParams.get('page') || '1', 10)
	const q = (url.searchParams.get('q') || '').trim()

	const entries = await getEntries(locals.prisma, { order, page, q })

	return json(entries)
}
