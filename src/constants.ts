import { env as public_env } from '$env/dynamic/public'

export const HTTP_CODES = {
	FORBIDDEN: 403,
	SERVER_ERROR: 500,
	UNAUTHORIZED: 401,
	UNPROCESSABLE_ENTITY: 422,
}

export const USER_ROLES = {
	SUPERADMIN: 'SUPERADMIN',
	USER: 'USER',
}

export const COOKIES = {
	session: {
		maxAge: 60 * 10, // in seconds
		name: 'session',
		options: { httpOnly: true, sameSite: 'strict', path: '/', secure: true } as const,
	},
}

export const OWNER = {
	slug: public_env.PUBLIC_OWNER_SLUG,
	username: public_env.PUBLIC_OWNER_USERNAME,
}

export const SITE = {
	base_url: public_env.PUBLIC_BASE_URL || 'https://di.fly.dev',
}
