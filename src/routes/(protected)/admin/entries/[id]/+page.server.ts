import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, params }) => {
	const { id } = params

	const entry = await locals.prisma.entry.findUnique({
		where: { id },
		include: {
			owner: {
				select: {
					slug: true,
					username: true,
				},
			},
		},
	})

	return { admin: { entry } }
}
