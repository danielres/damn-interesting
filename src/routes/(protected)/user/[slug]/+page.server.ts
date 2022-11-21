import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, locals }) => {
	const entries = await locals.prisma.entry.findMany({
		where: { owner: { slug: params.slug } },
		include: { owner: { select: { username: true, slug: true } } },
		orderBy: { createdAt: 'desc' },
	})

	const user = await locals.prisma.user.findUnique({
		where: { slug: params.slug },
		select: { username: true, slug: true },
	})

	return {
		entries,
		user,
	}
}
