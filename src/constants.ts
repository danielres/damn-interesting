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
