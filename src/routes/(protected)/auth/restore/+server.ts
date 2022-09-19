import type { CurrentUserView } from '../../../../db/types'
import type { RequestHandler } from './$types'

import { getCurrentUserFromCookies } from '$lib/request'
import { makeUnauthorizedResponse } from '$lib/response'
import { json } from '@sveltejs/kit'
import pick from 'lodash.pick'
import { populateUser } from '../../../../db/db'

export const POST: RequestHandler = async ({ cookies }) => {
	const userDbRecord = await getCurrentUserFromCookies(cookies)
	if (!userDbRecord) return makeUnauthorizedResponse('Auth failed, current user not found')

	const populated = await populateUser(userDbRecord)

	const currentUserView: CurrentUserView = pick(populated, [
		'id',
		'email',
		'slug',
		'username',
		'invitedBy',
		'invitedAt',
	])

	return json(currentUserView)
}
