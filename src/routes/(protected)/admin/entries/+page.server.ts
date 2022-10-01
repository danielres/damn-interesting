import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const entries = await locals.prisma.entry.findMany({
		select: {
			id: true,
			title: true,
			thumbnailUrl: true,
			createdAt: true,
			owner: {
				select: {
					slug: true,
					username: true,
					role: true,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	return {
		admin: { entries },
	}
}
