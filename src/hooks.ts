import type { Handle } from '@sveltejs/kit'
import type { CurrentUserView, UserDbRecord } from './db/types'

import pick from 'lodash.pick'
import { populateUser } from './db/db'
import { getCurrentUserFromRequest } from './lib/request'

export const handle: Handle = async ({ event, resolve }) => {
	const dbUser: UserDbRecord | undefined = await getCurrentUserFromRequest(event.request)

	if (!dbUser) return resolve(event)

	const currentUser = pick(dbUser, ['id', 'email', 'username', 'slug', 'invitedById', 'invitedAt'])
	const currentUserView: CurrentUserView = await populateUser(currentUser)

	event.locals = {
		...event.locals,
		user: currentUserView,
	}

	return resolve(event)
}
