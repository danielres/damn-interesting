import type { RequestHandler } from './$types'

import { makeUnauthorizedResponse } from '$lib/response'
import { Entries } from '../../../../db/db'

export const POST: RequestHandler = async ({ locals, request }) => {
	const { user } = locals
	if (!user) return makeUnauthorizedResponse('Unauthorized: User not found')

	const { url, description } = await request.json()
	const result = await Entries.insert({ url, description, ownerId: user.id })
	const { ownerId, ...rest } = result // eslint-disable-line @typescript-eslint/no-unused-vars
	return new Response(JSON.stringify(rest))
}
