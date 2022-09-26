import type { InvitationObject } from '$types'
import type { Actions } from './$types'

import { HTTP_CODES } from '$constants'
import { decryptObject, encryptObject } from '$lib/encryption'
import { compare, hash } from '$lib/password'
import { getFormEntriesFromRequest } from '$lib/request'
import { slugify } from '$lib/string'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { invalid } from '@sveltejs/kit'

const COOKIE_MAX_AGE = 60 * 10 // in seconds
const COOKIE_NAME = 'session'
const COOKIE_OPTIONS = { httpOnly: true, sameSite: 'strict', path: '/', secure: true } as const

export const actions: Actions = {
	signin: async ({ cookies, request, locals }) => {
		const errors: { field?: string; message: string }[] = []
		const { email, password } = await getFormEntriesFromRequest(request)

		let user
		try {
			user = await locals.prisma.user.findFirst({ where: { email: email } })
		} catch (error) {
			console.log(error)
		}

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

	signup: async ({ request, locals }) => {
		const { username, email, password } = await getFormEntriesFromRequest(request)
		const id = crypto.randomUUID()

		const data = {
			id,
			email,
			slug: slugify(username),
			username,
			inviterId: id,
			password,
		}

		// TODO: Dry up (1/2)
		try {
			await locals.prisma.user.create({ data })
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				const isUniqueConstraintError = error.code === 'P2002'

				if (isUniqueConstraintError) {
					const errors = Array(error.meta?.target).map((field) => ({
						field,
						message: 'already in use',
					}))
					return invalid(HTTP_CODES.UNPROCESSABLE_ENTITY, { errors })
				}
			}

			throw error
		}
	},

	'signup-with-code': async ({ request, locals }) => {
		const errors: { field: string; message: string }[] = []
		const { username, password, code } = await getFormEntriesFromRequest(request)
		const { email, inviterId, invitedAt } = decryptObject(code)

		const foundByUsername = await locals.prisma.user.count({ where: { username } })
		const foundByEmail = await locals.prisma.user.count({ where: { email } })

		if (foundByUsername > 0) errors.push({ field: 'username', message: 'already in use' })
		if (foundByEmail > 0) errors.push({ field: 'email', message: 'already in use' })

		if (errors.length > 0) return invalid(HTTP_CODES.UNPROCESSABLE_ENTITY, { errors })

		const data = {
			email,
			invitedAt,
			inviterId,
			password: await hash(password),
			slug: slugify(username),
			username,
		}

		// TODO: Dry up (2/2)
		try {
			await locals.prisma.user.create({ data })
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				const isUniqueConstraintError = error.code === 'P2002'

				if (isUniqueConstraintError) {
					const errors = Array(error.meta?.target).map((field) => ({
						field,
						message: 'already in use',
					}))
					return invalid(HTTP_CODES.UNPROCESSABLE_ENTITY, { errors })
				}
			}

			throw error
		}
	},

	'generate-invitation-code': async ({ locals, request }) => {
		const errors: { message: string }[] = []
		const { email } = await getFormEntriesFromRequest(request)

		const user = await locals.prisma.user.findUnique({ where: { email } })

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
			inviterId: currentUser.id,
			invitedAt: new Date().toISOString(),
		}

		const code = encryptObject(invitationObject)

		return { code }
	},
}
