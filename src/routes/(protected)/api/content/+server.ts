import type { RequestHandler } from './$types'

import { HTTP_CODES } from '$constants'
import { makeUnauthorizedResponse } from '$lib/response'
import * as validators from '$lib/validators'
import { Prisma } from '@prisma/client'

export const POST: RequestHandler = async ({ locals, request }) => {
	let errors: { field?: string; message: string }[] = []

	const { user } = locals
	if (!user) return makeUnauthorizedResponse('Unauthorized: User not found')

	const data = await request.json()
	const { description, title } = data

	errors = [...errors, ...validators.entry({ title, description })]

	if (errors.length > 0)
		return new Response(JSON.stringify(errors), { status: HTTP_CODES.UNPROCESSABLE_ENTITY })

	const resourceId = data.thumbnailUrl.split('/vi/')[1].split('/')[0]

	try {
		const result = await locals.prisma.entry.create({
			data: {
				id: resourceId,
				ownerId: user.id,
				...data,
			},
		})

		return new Response(JSON.stringify(result))
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			const isUniqueConstraintError = error.code === 'P2002'

			if (isUniqueConstraintError) {
				errors.push({ message: 'Sorry, this entry already exists.' })
				return new Response(JSON.stringify(errors), { status: HTTP_CODES.UNPROCESSABLE_ENTITY })
			}
		}

		throw error
	}
}
