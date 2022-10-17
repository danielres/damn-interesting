import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, locals }) => {
	const tag = await locals.prisma.tag.findUnique({
		where: { name: params.name },
		include: {
			taggings: {
				include: { entry: { include: { owner: { select: { username: true, slug: true } } } } },
			},
		},
	})

	if (!tag) return {}

	const tags = await locals.prisma.tag.findMany({
		include: { taggings: true },
		orderBy: { name: 'asc' },
	})

	return { tag, tags }
}
