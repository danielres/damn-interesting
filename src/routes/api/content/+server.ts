import type { RequestHandler } from './$types'
import { Entries } from '../../../db/db'

export const POST: RequestHandler = async ({ request }) => {
	const { url, description } = await request.json()
	const result = await Entries.insert({ url, description, ownerId: 'TODO' })
	return new Response(JSON.stringify(result))
}
