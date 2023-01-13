import { COOKIES } from '$constants'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.delete(COOKIES.session.name, COOKIES.session.options)
	return new Response()
}
