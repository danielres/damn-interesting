import type { RequestHandler } from './$types'
import type { Entry, PrismaClient } from '@prisma/client'
export type EntryGETResponse = Awaited<ReturnType<typeof getEntry>>

import { json } from '@sveltejs/kit'

const getEntry = async (prisma: PrismaClient, { id }: { id: Entry['id'] }) =>
	prisma.entry.findUnique({
		where: { id },
		include: {
			owner: { select: { username: true, slug: true } },
			taggings: { include: { tag: { include: { taggings: true } } } },
		},
	})

export const GET: RequestHandler = async ({ locals, params }) => {
	const entry = await getEntry(locals.prisma, { id: params.id })
	return json(entry)
}
