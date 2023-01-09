import type { FormError } from '$lib/validators'
import type { InvitationObject } from '$types'
import type { Actions } from './$types'

import { COOKIES, HTTP_CODES, USER_ROLES } from '$constants'
import { decryptObject, encryptObject } from '$lib/encryption'
import { compare } from '$lib/password'
import { getFormEntriesFromRequest } from '$lib/request'
import { slugify } from '$lib/string'
import { Prisma } from '@prisma/client'
import { fail } from '@sveltejs/kit'
import { randomUUID } from 'crypto'

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
				return fail(HTTP_CODES.UNPROCESSABLE_ENTITY, { errors })
			}
		}

		throw error
	}
}

export const actions: Actions = {
	renew: async ({ cookies }) => {
		const errors: FormError[] = []
		const encryptedSession = cookies.get(COOKIES.session.name)

		if (!encryptedSession) {
			errors.push({ message: 'Session expired' })
			return fail(HTTP_CODES.UNAUTHORIZED, { errors })
		}

		cookies.set(COOKIES.session.name, encryptedSession, {
			...COOKIES.session.options,
			maxAge: COOKIES.session.maxAge,
		})
	},

	signin: async ({ cookies, request, locals }) => {
		const errors: FormError[] = []
		const { email, password } = await getFormEntriesFromRequest(request)

		const user = await locals.prisma.user.findFirst({ where: { email: email } })

		if (!user) {
			errors.push({ message: 'Email/password combination is not valid' })
			return fail(HTTP_CODES.FORBIDDEN, { errors })
		}

		const isPasswordValid = await compare(password.toString(), user.password)

		if (!isPasswordValid) {
			errors.push({ message: 'Email/password combination is not valid' })
			return fail(HTTP_CODES.FORBIDDEN, { errors })
		}

		await locals.prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } })
		const encryptedSession = encryptObject({ userId: user.id })

		cookies.set(COOKIES.session.name, encryptedSession, {
			...COOKIES.session.options,
			maxAge: COOKIES.session.maxAge,
		})
	},

	signout: ({ cookies }) => cookies.delete(COOKIES.session.name, COOKIES.session.options),

	signup: async ({ request, locals }) => {
		const errors: FormError[] = []

		const canSignup = await locals.can.signup(locals.prisma)

		if (!canSignup) {
			errors.push({ message: 'Sorry, by invitation only at this time.' })
			return fail(HTTP_CODES.UNAUTHORIZED, { errors })
		}
		const { password2, ...values } = await getFormEntriesFromRequest(request) // eslint-disable-line @typescript-eslint/no-unused-vars

		const isFirstUser = (await locals.prisma.user.count({})) === 0

		const data: Prisma.UserUncheckedCreateInput = {
			id: randomUUID(),
			...values,
			slug: slugify(values.username),
			...(isFirstUser ? { role: USER_ROLES.SUPERADMIN } : {}),
		}

		return handlePrismaCreate(() => locals.prisma.user.create({ data }))
	},

	'signup-with-code': async ({ request, locals }) => {
		const errors: FormError[] = []
		const { username, password, code } = await getFormEntriesFromRequest(request)
		const { email, inviterId, invitedAt } = decryptObject(code)

		const countByUsername = await locals.prisma.user.count({ where: { username } })
		const countByEmail = await locals.prisma.user.count({ where: { email } })

		if (countByUsername > 0) errors.push({ field: 'username', message: 'already in use' })
		if (countByEmail > 0) errors.push({ field: 'email', message: 'already in use' })

		if (errors.length > 0) return fail(HTTP_CODES.UNPROCESSABLE_ENTITY, { errors })

		const data: Prisma.UserUncheckedCreateInput = {
			id: randomUUID(),
			email,
			invitedAt,
			inviterId,
			password,
			slug: slugify(username),
			username,
		}

		return handlePrismaCreate(() => locals.prisma.user.create({ data }))
	},

	'generate-invitation-code': async ({ locals, request }) => {
		const errors: FormError[] = []
		const { email } = await getFormEntriesFromRequest(request)

		const user = await locals.prisma.user.findUnique({ where: { email } })

		if (user) {
			errors.push({ message: 'This person is a member already.' })
			return fail(HTTP_CODES.FORBIDDEN, { errors })
		}

		const currentUser = locals.user

		if (!currentUser) {
			errors.push({ message: 'Unauthorized, please sign in first.' })
			return fail(HTTP_CODES.UNAUTHORIZED, { errors })
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
