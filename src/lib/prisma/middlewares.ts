import type { Prisma } from '@prisma/client'

import { hash } from '$lib/password'
import { prisma2 } from '$lib/prisma/clients'

export const hashUserPassword: Prisma.Middleware = async (params, next) => {
	if (params.model === 'User' && params.action === 'create')
		params.args.data.password = await hash(params.args.data.password)
	return next(params)
}

export const logMutations: Prisma.Middleware = async (params, next) => {
	const result = await next(params)
	const mutations = ['create', 'createMany', 'delete', 'deleteMany', 'update', 'updateMany']
	if (!mutations.includes(params.action)) return result
	await prisma2.operation.create({ data: { params, model: params.model, action: params.action } })
	return result
}
