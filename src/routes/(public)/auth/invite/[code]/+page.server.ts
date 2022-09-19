import type { InvitationObject } from '../../../../../db/types'
import type { PageServerLoad } from './$types'

import { decryptObject } from '$lib/encryption'
import { Users } from '../../../../../db/db'

export const load: PageServerLoad = async ({ params }) => {
	const { invitedById, invitedAt, email }: InvitationObject = decryptObject(params.code)

	const invitedBy = await Users.findById(invitedById)

	return {
		code: params.code,
		email,
		invitedAt,
		invitedBy: {
			username: invitedBy.username,
			slug: invitedBy.slug,
		},
	}
}
