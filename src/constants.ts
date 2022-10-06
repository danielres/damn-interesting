import { PUBLIC_OWNER_SLUG, PUBLIC_OWNER_USERNAME } from '$env/static/public'

export const HTTP_CODES = {
	FORBIDDEN: 403,
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
	slug: PUBLIC_OWNER_SLUG,
	username: PUBLIC_OWNER_USERNAME,
}
