import type { RequestHandler } from './$types'

import { COOKIES, HTTP_CODES } from '$constants'
import { error } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ cookies }) => {
	const encryptedSession = cookies.get(COOKIES.session.name)

	if (!encryptedSession) {
		// cookies.delete(COOKIES.session.name, COOKIES.session.options)

		throw error(HTTP_CODES.UNAUTHORIZED, 'Session expired')
	}

	cookies.set(COOKIES.session.name, encryptedSession, {
		...COOKIES.session.options,
		maxAge: COOKIES.session.maxAge,
	})
	return new Response()
}
