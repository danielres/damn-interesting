import type { InvitationObject } from '../../../db/types'
import type { Actions } from './$types'

import { decryptObject, encryptObject } from '$lib/encryption'
import { compare } from '$lib/password'
import { getFormEntriesFromRequest } from '$lib/request'
import { slugify } from '$lib/string'
import { invalid } from '@sveltejs/kit'
import { Users } from '../../../db/db'

const COOKIE_MAX_AGE = 60 // in seconds
const COOKIE_NAME = 'session'
const COOKIE_OPTIONS = { httpOnly: true, sameSite: 'strict', path: '/', secure: true } as const

const HTTP_CODES = {
	FORBIDDEN: 403,
	UNPROCESSABLE_ENTITY: 422,
}

export const actions: Actions = {
	signin: async ({ cookies, request }) => {
		const errors: { message: string; field?: string }[] = []
		const { email, password } = await getFormEntriesFromRequest(request)

		const user = await Users.findByEmail(email.toString())

		if (!user) {
			errors.push({ message: 'Email/password combination is not valid' })
			return invalid(HTTP_CODES.FORBIDDEN, { errors })
		}

		const isPasswordValid = await compare(password.toString(), user.password)

		if (!isPasswordValid) {
			errors.push({ message: 'Email/password combination is not valid' })
			return invalid(HTTP_CODES.FORBIDDEN, { errors })
		}

		const encryptedSession = encryptObject({ userId: user.id })

		cookies.set(COOKIE_NAME, encryptedSession, { ...COOKIE_OPTIONS, maxAge: COOKIE_MAX_AGE })
	},

	signout: ({ cookies }) => cookies.delete(COOKIE_NAME, COOKIE_OPTIONS),

	signup: async ({ request }) => {
		const errors: { field: string; message: string }[] = []
		const { username, email, password } = await getFormEntriesFromRequest(request)

		const foundByUsername = await Users.findByUsername(username)
		const foundByEmail = await Users.findByEmail(email)

		if (foundByUsername) errors.push({ field: 'username', message: 'already in use' })
		if (foundByEmail) errors.push({ field: 'email', message: 'already in use' })

		if (errors.length > 0) return invalid(HTTP_CODES.UNPROCESSABLE_ENTITY, { errors })

		const id = crypto.randomUUID()

		await Users.insert({
			id,
			email,
			password,
			slug: slugify(username),
			username,
			invitedById: id,
			invitedAt: new Date().toISOString(),
		})
	},

	'signup-with-code': async ({ request }) => {
		const errors: { field: string; message: string }[] = []
		const { username, password, code } = await getFormEntriesFromRequest(request)
		const { email, invitedById, invitedAt } = decryptObject(code)

		const foundByUsername = await Users.findByUsername(username)
		const foundByEmail = await Users.findByEmail(email)

		if (foundByUsername) errors.push({ field: 'username', message: 'already in use' })
		if (foundByEmail) errors.push({ field: 'email', message: 'already in use' })

		if (errors.length > 0) return invalid(HTTP_CODES.UNPROCESSABLE_ENTITY, { errors })

		await Users.insert({
			email,
			invitedAt,
			invitedById,
			password,
			slug: slugify(username),
			username,
		})
	},

	'generate-invitation-code': async ({ locals, request }) => {
		const errors: { message: string }[] = []
		const { email } = await getFormEntriesFromRequest(request)

		const user = await Users.findByEmail(email)

		if (user) {
			errors.push({ message: 'This user has been invited already.' })
			return invalid(HTTP_CODES.FORBIDDEN, { errors })
		}

		const currentUser = locals.user

		if (!currentUser) {
			const UNAUTHORIZED_CODE = 401
			errors.push({ message: 'Unauthorized, please sign in first.' })
			return invalid(UNAUTHORIZED_CODE, { errors })
		}

		const invitationObject: InvitationObject = {
			email,
			invitedById: currentUser.id,
			invitedAt: new Date().toISOString(),
		}

		const code = encryptObject(invitationObject)

		return { code }
	},
}
