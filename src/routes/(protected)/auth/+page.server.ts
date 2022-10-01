import type { InvitationObject } from '$types'
import type { Actions } from './$types'

import { dev } from '$app/environment'
import { HTTP_CODES } from '$constants'
import { decryptObject, encryptObject } from '$lib/encryption'
import { compare, hash } from '$lib/password'
import { getFormEntriesFromRequest } from '$lib/request'
import { slugify } from '$lib/string'
import { Prisma } from '@prisma/client'
import { invalid } from '@sveltejs/kit'

const COOKIE_MAX_AGE = 60 * 10 // in seconds
const COOKIE_NAME = 'session'
const COOKIE_OPTIONS = { httpOnly: true, sameSite: 'strict', path: '/', secure: true } as const

type FormActionError = { field?: string; message: string }

const handlePrismaCreate = async (fn: () => Promise<unknown>) => {
	try {
		await fn()
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
}

export const actions: Actions = {
	signin: async ({ cookies, request, locals }) => {
		const errors: FormActionError[] = []
		const { email, password } = await getFormEntriesFromRequest(request)

		const user = await locals.prisma.user.findFirst({ where: { email: email } })

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
		const errors: FormActionError[] = []
		if (!dev) {
			errors.push({ message: 'Sorry, by invitation only at this time.' })
			return invalid(HTTP_CODES.UNAUTHORIZED, { errors })
		}

		const { username, email, password } = await getFormEntriesFromRequest(request)
		const id = crypto.randomUUID()

		const data: Prisma.UserUncheckedCreateInput = {
			id,
			email,
			inviterId: id,
			password,
			slug: slugify(username),
			username,
		}

		return handlePrismaCreate(() => locals.prisma.user.create({ data }))
	},

	'signup-with-code': async ({ request, locals }) => {
		const errors: FormActionError[] = []
		const { username, password, code } = await getFormEntriesFromRequest(request)
		const { email, inviterId, invitedAt } = decryptObject(code)

		const countByUsername = await locals.prisma.user.count({ where: { username } })
		const countByEmail = await locals.prisma.user.count({ where: { email } })

		if (countByUsername > 0) errors.push({ field: 'username', message: 'already in use' })
		if (countByEmail > 0) errors.push({ field: 'email', message: 'already in use' })

		if (errors.length > 0) return invalid(HTTP_CODES.UNPROCESSABLE_ENTITY, { errors })

		const data: Prisma.UserUncheckedCreateInput = {
			email,
			invitedAt,
			inviterId,
			password: await hash(password),
			slug: slugify(username),
			username,
		}

		return handlePrismaCreate(() => locals.prisma.user.create({ data }))
	},

	'generate-invitation-code': async ({ locals, request }) => {
		const errors: FormActionError[] = []
		const { email } = await getFormEntriesFromRequest(request)

		const user = await locals.prisma.user.findUnique({ where: { email } })

		if (user) {
			errors.push({ message: 'This person is a member already.' })
			return invalid(HTTP_CODES.FORBIDDEN, { errors })
		}

		const currentUser = locals.user

		if (!currentUser) {
			errors.push({ message: 'Unauthorized, please sign in first.' })
			return invalid(HTTP_CODES.UNAUTHORIZED, { errors })
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
