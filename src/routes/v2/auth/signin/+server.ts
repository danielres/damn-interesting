import { COOKIES, HTTP_CODES } from '$constants'
import { encryptObject } from '$lib/encryption'
import { compare } from '$lib/password'
import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request, locals, cookies }) => {
	const json = await request.text()
	const { email, password } = JSON.parse(json)

	const user = await locals.prisma.user.findFirst({ where: { email: email } })

	if (!user) throw error(HTTP_CODES.FORBIDDEN, 'Invalid email/password combination')

	const isPasswordValid = await compare(password.toString(), user.password)

	if (!isPasswordValid) throw error(HTTP_CODES.FORBIDDEN, 'Invalid email/password combination')

	await locals.prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } })
	const encryptedSession = encryptObject({ userId: user.id })

	cookies.set(COOKIES.session.name, encryptedSession, {
		...COOKIES.session.options,
		maxAge: COOKIES.session.maxAge,
	})

	return new Response()
}
