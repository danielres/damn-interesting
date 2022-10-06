import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const operations = await locals.prisma2.operation.findMany({
		orderBy: {
			executedAt: 'desc',
		},
	})

	return {
		admin: { operations },
	}
}
