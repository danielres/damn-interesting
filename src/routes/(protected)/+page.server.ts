import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const entries = await locals.prisma.entry.findMany({
		include: { owner: { select: { username: true, slug: true } } },
	})

	return { entries }
}
