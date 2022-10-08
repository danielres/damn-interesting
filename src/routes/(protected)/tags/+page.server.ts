import type { FormError } from '$lib/validators'
import type { Actions } from './$types'

import { HTTP_CODES } from '$constants'
import { getFormEntriesFromRequest } from '$lib/request'
import { invalid } from '@sveltejs/kit'
import { prisma } from '@prisma/client'

export const actions: Actions = {
	'connect-or-create': async ({ request, locals }) => {
		const errors: FormError[] = []
		const { name, entryId } = await getFormEntriesFromRequest(request)

		const user = locals.user
		const entry = await locals.prisma.entry.findUnique({ where: { id: entryId } })

		if (!user || !locals.can.updateEntry(user, entry)) {
			errors.push({ message: 'Forbidden' })
			return invalid(HTTP_CODES.FORBIDDEN, { errors })
		}

		await locals.prisma.entry.update({
			where: { id: entryId },
			data: {
				tags: {
					connectOrCreate: {
						where: { name },
						create: { name, creatorId: user?.id },
					},
				},
			},
		})
	},

	disconnect: async ({ request, locals }) => {
		const errors: FormError[] = []
		const { tagId, entryId } = await getFormEntriesFromRequest(request)

		const user = locals.user
		const entry = await locals.prisma.entry.findUnique({ where: { id: entryId } })

		if (!user || !locals.can.updateEntry(user, entry)) {
			errors.push({ message: 'Forbidden' })
			return invalid(HTTP_CODES.FORBIDDEN, { errors })
		}

		await locals.prisma.tag.update({
			where: { id: tagId },
			data: { entries: { disconnect: { id: entryId } } },
		})
	},
}
