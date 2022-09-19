import type { Handle } from '@sveltejs/kit'
import type { CurrentUserView, UserDbRecord } from './db/types'

import pick from 'lodash.pick'
import { populateUser } from './db/db'
import { getCurrentUserFromCookies } from './lib/request'

export const handle: Handle = async ({ event, resolve }) => {
	const dbUser: UserDbRecord | undefined = await getCurrentUserFromCookies(event.cookies)

	if (!dbUser) return resolve(event)

	const currentUser = pick(dbUser, ['id', 'email', 'username', 'slug', 'invitedById', 'invitedAt'])
	const currentUserView: CurrentUserView = await populateUser(currentUser)

	event.locals = {
		...event.locals,
		user: currentUserView,
	}

	return resolve(event)
}
