import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, params }) => {
	const tag = await locals.prisma.tag.findUnique({
		where: { id: params.id },
		include: {
			creator: true,
			taggings: {
				include: { entry: { include: { owner: true } }, creator: true },
			},
		},
	})

	return { admin: { tag } }
}
