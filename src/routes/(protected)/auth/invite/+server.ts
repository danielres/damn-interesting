import type { InvitationObject } from '../../../../db/types'
import type { RequestHandler } from './$types'

import { encryptObject } from '$lib/encryption'
import { makeUnauthorizedResponse } from '$lib/response'
import { json } from '@sveltejs/kit'
import { Users } from '../../../../db/db'

export const POST: RequestHandler = async ({ locals, request }) => {
	const errors: { message: string }[] = []
	const { email } = await request.json()

	const user = await Users.findByEmail(email)

	if (user) {
		errors.push({ message: 'This user has been invited already' })
		return new Response(JSON.stringify(errors), { status: 403 })
	}

	const currentUser = locals.user

	if (!currentUser) return makeUnauthorizedResponse('Inviter user not found')

	const invitationObject: InvitationObject = {
		email,
		invitedById: currentUser.id,
		invitedAt: new Date().toISOString(),
	}

	const code = encryptObject(invitationObject)

	return json(code)
}
