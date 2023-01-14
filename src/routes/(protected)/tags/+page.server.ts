import type { FormError } from '$lib/validators'
import type { Actions } from './$types'

import { HTTP_CODES } from '$constants'
import { getFormEntriesFromRequest } from '$lib/request'
import { fail } from '@sveltejs/kit'
import { capitalizeFirst, sanitizeInputValue } from '$lib/string'

export const actions: Actions = {
	'connect-or-create': async ({ request, locals }) => {
		const errors: FormError[] = []
		const { name: _name, entryId } = await getFormEntriesFromRequest(request)

		const name = capitalizeFirst(sanitizeInputValue(_name))
		if (!name) return

		const user = locals.user
		const entry = await locals.prisma.entry.findUnique({ where: { id: entryId } })

		if (!user || !locals.can.updateEntry(user, entry)) {
			errors.push({ message: 'Forbidden' })
			return fail(HTTP_CODES.FORBIDDEN, { errors })
		}

		const newDate = new Date()
		await locals.prisma.entry.update({
			where: { id: entryId },
			data: {
				taggings: {
					create: {
						createdAt: newDate,
						creator: {
							connect: {
								id: user.id,
							},
						},
						tag: {
							connectOrCreate: {
								where: { name },
								create: {
									name,
									createdAt: newDate,
									creator: {
										connect: {
											id: user.id,
										},
									},
								},
							},
						},
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
			return fail(HTTP_CODES.FORBIDDEN, { errors })
		}

		await locals.prisma.tagging.delete({
			where: { entryId_tagId: { entryId, tagId } },
		})

		const tag = await locals.prisma.tag.findUnique({
			where: { id: tagId },
			include: { taggings: { select: { entryId: true } } },
		})

		if (tag?.taggings.length === 0 && tag.creatorId === user.id)
			await locals.prisma.tag.delete({ where: { id: tagId } })
	},

	'query-tag-names': async ({ locals, request }) => {
		const { q } = await getFormEntriesFromRequest(request)
		const tags = await locals.prisma.tag.findMany({
			where: { name: { contains: q } },
		})
		const names = tags.map((t) => t.name)
		const startingWith = names.filter((name) => name.startsWith(q))
		const notStartingWith = q.length > 2 ? names.filter((name) => !name.startsWith(q)) : []
		const all = [...startingWith, ...notStartingWith]
		return all
	},
}
