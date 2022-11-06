import type { FormError } from '$lib/validators'
import type { Actions, PageServerLoad } from './$types'

import { HTTP_CODES } from '$constants'
import { getFormEntriesFromRequest } from '$lib/request'
import * as validators from '$lib/validators'
import { invalid } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params, locals }) => {
	const entry = await locals.prisma.entry.findUnique({
		where: { id: params.id },
		include: {
			owner: { select: { username: true, slug: true } },
			taggings: { include: { tag: { include: { taggings: true } } } },
		},
	})

	const suggestionsByAuthor = await locals.prisma.entry.findMany({
		where: { authorName: entry?.authorName, id: { not: entry?.id } },
		include: {
			owner: { select: { username: true, slug: true } },
		},
	})

	return { entry, suggestionsByAuthor }
}

export const actions: Actions = {
	update: async ({ request, locals, params }) => {
		let errors: FormError[] = []

		const id = params.id
		const user = locals.user

		const entry = await locals.prisma.entry.findUnique({ where: { id } })
		const canUpdateEntry = locals.can.updateEntry(user, entry)

		if (!canUpdateEntry) {
			errors.push({ message: 'Sorry, not allowed.' })
			return invalid(HTTP_CODES.UNAUTHORIZED, { errors })
		}
		const { id: _id, ...data } = await getFormEntriesFromRequest(request) // eslint-disable-line @typescript-eslint/no-unused-vars
		errors = [...errors, ...validators.entry(data)]
		if (errors.length > 0) return invalid(HTTP_CODES.UNPROCESSABLE_ENTITY, { errors })

		await locals.prisma.entry.update({ data, where: { id } })
	},
}
