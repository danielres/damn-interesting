import type { RequestHandler } from './$types'

import { Users } from '../../../../db/db'
import { slugify } from '$lib/string'

export const POST: RequestHandler = async ({ request }) => {
	const errors: { field: string; message: string }[] = []
	const { username, email, password } = await request.json()

	const foundByUsername = await Users.findByUsername(username)
	const foundByEmail = await Users.findByEmail(email)

	if (foundByUsername) errors.push({ field: 'username', message: 'already in use' })
	if (foundByEmail) errors.push({ field: 'email', message: 'already in use' })

	if (errors.length > 0) return new Response(JSON.stringify(errors), { status: 422 })

	const id = crypto.randomUUID()

	await Users.insert({
		id,
		email,
		password,
		slug: slugify(username),
		username,
		invitedById: id,
		invitedAt: new Date().toISOString(),
	})

	return new Response()
}
