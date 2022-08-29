import type { RequestHandler } from './$types'

import { decryptObject } from '$lib/encryption'
import { addUser, users } from '../../../../data'

export const POST: RequestHandler = async ({ request }) => {
	const errors: { field: string; message: string }[] = []
	const { username, password, code } = await request.json()
	const { email, invitedBy, invitedAt } = decryptObject(code)

	const foundByUsername = users.find((u) => u.username === username)
	const foundByEmail = users.find((u) => u.email === email)

	if (foundByUsername) errors.push({ field: 'username', message: 'already in use' })
	if (foundByEmail) errors.push({ field: 'email', message: 'already in use' })

	if (errors.length > 0) return new Response(JSON.stringify(errors), { status: 422 })

	await addUser({ username, email, password, invitedBy, invitedAt })

	return new Response()
}
