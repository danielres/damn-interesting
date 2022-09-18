import pick from 'lodash.pick'

import type { UserView } from '../../../db/types'
import type { PageServerLoad } from './$types'

import { Entries, populateUser, Users } from '../../../db/db'

export const load: PageServerLoad = async ({ params }) => {
	const userSlug = params.slug

	const user = await Users.findBySlug(userSlug)
	if (!user) return { entries: [], user: undefined }

	const populatedUser = await populateUser(user)

	const entries = await Entries.listByOwnerSlug(userSlug)
	const userView: UserView = pick(populatedUser, ['username', 'slug', 'invitedBy', 'invitedAt'])

	return {
		entries,
		user: userView,
	}
}
