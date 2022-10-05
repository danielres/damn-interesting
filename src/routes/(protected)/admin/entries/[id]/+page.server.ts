import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, params }) => {
	const entry = await locals.prisma.entry.findUnique({
		where: { id: params.id },
		include: {
			owner: { select: { slug: true, username: true } },
		},
	})

	return { admin: { entry } }
}
