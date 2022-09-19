import type { PageServerLoad } from './$types'

import { Entries } from '../../db/db'

export const load: PageServerLoad = async () => {
	const entries = await Entries.list()
	return { entries }
}
