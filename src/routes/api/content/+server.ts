import type { Locals } from 'src/routes/types'
import type { RequestHandler } from './$types'

import { Entries } from '../../../db/db'
import { makeUnauthorizedResponse } from '../../../lib/response'

export const POST: RequestHandler = async ({ locals, request }) => {
	const { user } = locals as Locals
	if (!user) return makeUnauthorizedResponse('Unauthorized: User not found')

	const { url, description } = await request.json()
	const result = await Entries.insert({ url, description, ownerId: user.id })
	const { ownerId, ...rest } = result // eslint-disable-line @typescript-eslint/no-unused-vars
	return new Response(JSON.stringify(rest))
}
