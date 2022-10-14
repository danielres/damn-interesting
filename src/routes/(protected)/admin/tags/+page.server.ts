import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const tags = await locals.prisma.tag.findMany({
		orderBy: {
			name: 'asc',
		},
	})

	return {
		admin: { tags },
	}
}
