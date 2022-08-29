import type { RequestHandler } from './$types'

import { json } from '@sveltejs/kit'
import { users } from '../../../data'
import { encryptObject } from '$lib/encryption'

export const POST: RequestHandler = async ({ request }) => {
	const errors: { message: string }[] = []
	const { email } = await request.json()

	const user = users.find((u) => u.email === email)

	if (user) {
		errors.push({ message: 'This user has been invited already' })
		return new Response(JSON.stringify(errors), { status: 403 })
	}

	const code = encryptObject({ email, invitedBy: 'uuid', invitedAt: new Date().toISOString() })

	return json(code)
}
