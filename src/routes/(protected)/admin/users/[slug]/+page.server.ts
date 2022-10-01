import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, params }) => {
	const { slug } = params

	const user = await locals.prisma.user.findUnique({
		where: { slug },
		include: {
			invitees: {
				select: {
					slug: true,
					username: true,
				},
				orderBy: { invitedAt: 'desc' },
			},
			inviter: {
				select: {
					slug: true,
					username: true,
				},
			},
			entries: {
				select: { title: true, id: true, createdAt: true },
				orderBy: { createdAt: 'desc' },
			},
		},
	})

	return { admin: { user } }
}
