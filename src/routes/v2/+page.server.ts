import type { PageServerLoad } from './$types'

import { to } from '$paths'
import { redirect } from '@sveltejs/kit'

export const load = (async () => {
	throw redirect(302, to.entries())
}) satisfies PageServerLoad
