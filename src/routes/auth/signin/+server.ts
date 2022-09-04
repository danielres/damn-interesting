import type { RequestHandler } from './$types'

import { json } from '@sveltejs/kit'
import { compare } from '../../../lib/password'

import { Users } from '../../../db/db'

export const POST: RequestHandler = async ({ request }) => {
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

	return json({
		username: user.username,
		email: user.email,
	})
}
