import type { RequestHandler } from './$types'

import { encryptObject } from '$lib/encryption'
import { json } from '@sveltejs/kit'
import { Users } from '../../../db/db'

export const POST: RequestHandler = async ({ request }) => {
	const errors: { message: string }[] = []
	const { email } = await request.json()

	const user = await Users.findByEmail(email)

	if (user) {
		errors.push({ message: 'This user has been invited already' })
		return new Response(JSON.stringify(errors), { status: 403 })
	}

	const code = encryptObject({ email, invitedBy: 'uuid', invitedAt: new Date().toISOString() })

	return json(code)
}
