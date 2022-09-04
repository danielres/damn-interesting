import type { RequestHandler } from './$types'

import { decryptObject } from '$lib/encryption'
import { Users } from '../../../../db/db'

export const POST: RequestHandler = async ({ request }) => {
	const errors: { field: string; message: string }[] = []
	const { username, password, code } = await request.json()
	const { email, invitedBy, invitedAt } = decryptObject(code)

	// const users = await Users.list()
	const foundByUsername = await Users.findByUsername(username)
	const foundByEmail = await Users.findByEmail(email)

	if (foundByUsername) errors.push({ field: 'username', message: 'already in use' })
	if (foundByEmail) errors.push({ field: 'email', message: 'already in use' })

	if (errors.length > 0) return new Response(JSON.stringify(errors), { status: 422 })

	await Users.insert({ username, email, password, invitedBy, invitedAt })

	return new Response()
}
