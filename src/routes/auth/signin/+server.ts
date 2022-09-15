import type { RequestHandler } from './$types'

import { json } from '@sveltejs/kit'
import { Users } from '../../../db/db'
import { encryptObject } from '../../../lib/encryption'
import { compare } from '../../../lib/password'

const COOKIE_MAX_AGE = 60 // in seconds

export const POST: RequestHandler = async ({ setHeaders, request }) => {
	const errors: { message: string }[] = []
	const { email, password } = await request.json()

	const user = await Users.findByEmail(email)

	if (!user) {
		errors.push({ message: 'Email/password combination is not valid' })
		return new Response(JSON.stringify(errors), { status: 403 })
	}

	const isPasswordValid = await compare(password, user.password)

	if (!isPasswordValid) {
		errors.push({ message: 'Email/password combination is not valid' })
		return new Response(JSON.stringify(errors), { status: 403 })
	}

	const encryptedSession = encryptObject({ userId: user.id })

	setHeaders({
		'set-cookie': `session=${encryptedSession}; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; SameSite=Strict; Path=/; Secure`,
	})

	return json({
		username: user.username,
		email: user.email,
	})
}
