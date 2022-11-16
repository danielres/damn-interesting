import type { Prisma } from '@prisma/client'

import { hash } from '$lib/password'

export const hashUserPassword: Prisma.Middleware = async (params, next) => {
	if (params.model === 'User' && params.action === 'create')
		params.args.data.password = await hash(params.args.data.password)
	return next(params)
}
