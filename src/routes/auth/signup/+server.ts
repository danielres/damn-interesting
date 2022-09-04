import type { RequestHandler } from './$types'

import { Users } from '../../../db/db'

export const POST: RequestHandler = async ({ request }) => {
	const errors: { field: string; message: string }[] = []
	const { username, email, password } = await request.json()

	const foundByUsername = await Users.findByUsername(username)
	const foundByEmail = await Users.findByEmail(email)

	if (foundByUsername) errors.push({ field: 'username', message: 'already in use' })
	if (foundByEmail) errors.push({ field: 'email', message: 'already in use' })

	if (errors.length > 0) return new Response(JSON.stringify(errors), { status: 422 })

	await Users.insert({ username, email, password })

	return new Response()
}
