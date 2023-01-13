import type { Actions, PageServerLoad } from './$types'

import { HTTP_CODES } from '$constants'
import * as bot from '$lib/bot'
import { parseFormDataJson } from '$lib/request'
import { Prisma } from '@prisma/client'
import { fail } from '@sveltejs/kit'
import { ZodError } from 'zod'
import guardRoute from '../../guard.server'
import * as schemas from './components/FormEntryAdd/schemas.server'

export const load = (async ({ locals, route, request }) => {
	guardRoute(route.id, locals.user, request.method)
}) satisfies PageServerLoad

export type PageFormErrors = Record<string, string[]>

export const actions: Actions = {
	default: async ({ locals, request, route }) => {
		const user = guardRoute(route.id, locals.user, request.method)
		const rawValues = await parseFormDataJson(request)

		try {
			const { tags, ...data } = schemas.newEntry.parse(rawValues)

			const createdEntry = await locals.prisma.entry.create({
				data: {
					ownerId: user.id,
					...data,
					taggings: {
						create: tags.map((name: string) => ({
							createdAt: data.createdAt,
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
										createdAt: data.createdAt,
										creator: {
											connect: {
												id: user.id,
											},
										},
									},
								},
							},
						})),
					},
				},
				include: {
					taggings: { select: { tag: { select: { name: true } } } },
				},
			})

			bot.handleNewEntry(user.username, createdEntry)
		} catch (error) {
			if (error instanceof ZodError) {
				return fail(400, { errors: error.flatten().fieldErrors })
			}

			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				const isUniqueConstraintError = error.code === 'P2002'
				if (isUniqueConstraintError) {
					return fail(HTTP_CODES.UNPROCESSABLE_ENTITY, {
						errors: { url: ['Sorry, this entry already exists.'] },
					})
				}
			}

			// TODO: report error
			throw error
		}
	},
}
