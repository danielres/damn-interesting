import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const users = await locals.prisma.user.findMany({
		select: {
			id: true,
			email: true,
			username: true,
			slug: true,
			invitedAt: true,
			lastLoginAt: true,
			role: true,
			inviter: {
				select: {
					slug: true,
					username: true,
					role: true,
				},
			},
		},
	})

	return {
		admin: { users },
	}
}
