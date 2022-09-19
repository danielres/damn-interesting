import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.delete('session', { httpOnly: true, sameSite: 'strict', path: '/', secure: true })
	return new Response()
}
