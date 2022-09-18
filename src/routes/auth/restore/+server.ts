import type { CurrentUserView } from 'src/db/types'
import type { RequestHandler } from './$types'

import { json } from '@sveltejs/kit'
import cookie from 'cookie'
import pick from 'lodash.pick'
import { populateUser, Users } from '../../../db/db'
import { decryptObject } from '../../../lib/encryption'
import { makeUnauthorizedResponse } from '../../../lib/response'

export const POST: RequestHandler = async ({ request }) => {
	const cookies = request.headers.get('cookie')

	if (!cookies) return makeUnauthorizedResponse('Auth failed, cookies missing')
	const { session: encryptedSession } = cookie.parse(cookies)

	if (!encryptedSession) return makeUnauthorizedResponse('Auth failed, session cookie missing')
	const { userId } = decryptObject(encryptedSession)

	const userDbRecord = await Users.findById(userId)
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
