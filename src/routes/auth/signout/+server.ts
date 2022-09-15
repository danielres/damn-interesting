import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ setHeaders }) => {
	setHeaders({ 'set-cookie': `session=; Max-Age=0; HttpOnly; SameSite=Strict; Path=/; Secure` })
	return new Response()
}
