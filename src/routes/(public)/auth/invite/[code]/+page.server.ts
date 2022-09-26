import type { InvitationObject } from '$types'
import type { PageServerLoad } from './$types'

import { decryptObject } from '$lib/encryption'

export const load: PageServerLoad = async ({ params, locals }) => {
	const { inviterId, invitedAt, email }: InvitationObject = decryptObject(params.code)

	const inviter = await locals.prisma.user.findUniqueOrThrow({
		where: { id: inviterId },
		select: { username: true, slug: true },
	})

	return {
		code: params.code,
		email,
		invitedAt,
		inviter,
	}
}
