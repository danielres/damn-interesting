import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
	const tags = await locals.prisma.tag.findMany({
		include: { taggings: true },
		orderBy: { name: 'asc' },
	})

	return { tags }
}
