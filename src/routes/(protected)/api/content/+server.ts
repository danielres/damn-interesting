import type { RequestHandler } from './$types'

import { HTTP_CODES } from '$constants'
import { getYoutubeGetVideoDetails } from '$lib/Entry/youtube'
import { makeUnauthorizedResponse } from '$lib/response'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

export const POST: RequestHandler = async ({ locals, request }) => {
	const errors: { field?: string; message: string }[] = []

	const { user } = locals
	if (!user) return makeUnauthorizedResponse('Unauthorized: User not found')

	const { url, description } = await request.json()

	let youtubeVideoDetails

	try {
		youtubeVideoDetails = await getYoutubeGetVideoDetails(url)
	} catch (error) {
		errors.push({ field: 'url', message: 'Youtube url not valid' })
		return new Response(JSON.stringify(errors), { status: HTTP_CODES.UNPROCESSABLE_ENTITY })
	}

	const resourceId = youtubeVideoDetails.thumbnailUrl.split('/vi/')[1].split('/')[0]

	try {
		const result = await locals.prisma.entry.create({
			data: {
				id: resourceId,
				url,
				description,
				ownerId: user.id,
				...youtubeVideoDetails,
			},
		})

		return new Response(JSON.stringify(result))
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			const isUniqueConstraintError = error.code === 'P2002'

			if (isUniqueConstraintError) {
				errors.push({ message: 'Sorry, this entry already exists.' })
				return new Response(JSON.stringify(errors), { status: HTTP_CODES.UNPROCESSABLE_ENTITY })
			}
		}

		throw error
	}
}
