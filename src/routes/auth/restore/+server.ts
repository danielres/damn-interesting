import type { RequestHandler } from './$types'

import { json } from '@sveltejs/kit'
import cookie from 'cookie'
import { Users } from '../../../db/db'
import { decryptObject } from '../../../lib/encryption'

const makeUnauthorizedResponse = (message = 'Unauthorized') =>
	new Response(JSON.stringify({ errors: [{ message }] }), { status: 401 })

export const POST: RequestHandler = async ({ request }) => {
	const cookies = request.headers.get('cookie')

	if (!cookies) return makeUnauthorizedResponse('Auth failed, cookies missing')
	const { session: encryptedSession } = cookie.parse(cookies)

	if (!encryptedSession) return makeUnauthorizedResponse('Auth failed, session cookie missing')
	const { userId } = decryptObject(encryptedSession)

	const user = await Users.findById(userId)
	if (!user) return makeUnauthorizedResponse('Auth failed, user not found')

	return json({
		username: user.username,
		email: user.email,
	})
}
