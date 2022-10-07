import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	return {
		can: {
			replay: await locals.can.replay(locals.prisma),
		},
	}
}
