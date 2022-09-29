import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, locals }) => {
	const entry = await locals.prisma.entry.findUnique({
		where: { id: params.id },
		include: {
			owner: { select: { username: true, slug: true } },
		},
	})

	const suggestionsByAuthor = await locals.prisma.entry.findMany({
		where: { authorName: entry?.authorName, id: { not: entry?.id } },
		include: {
			owner: { select: { username: true, slug: true } },
		},
	})

	return { entry, suggestionsByAuthor }
}
