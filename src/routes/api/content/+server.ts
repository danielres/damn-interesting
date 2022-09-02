import type { RequestHandler } from './$types'
import { addEntry } from '../../../data'

export const POST: RequestHandler = async ({ request }) => {
	const { url, description } = await request.json()
	const result = await addEntry({ url, description })
	return new Response(JSON.stringify(result))
}
