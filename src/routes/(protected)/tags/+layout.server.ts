import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const tags = await locals.prisma.tag.findMany({
		include: { taggings: true },
		orderBy: { name: 'asc' },
	})

	return { tags }
}
