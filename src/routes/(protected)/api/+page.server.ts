import type { Entry, Prisma, User } from '@prisma/client'
import type { Actions } from './$types'

import { PrismaClient } from '@prisma/client'

type Params = {
	args: { data: Entry | User }
	model: Prisma.ModelName
	action: Prisma.PrismaAction
	dataPath: Array<unknown>
	runInTransaction: boolean
}

export const actions: Actions = {
	replay: async ({ locals }) => {
		const operations = await locals.prisma2.operation.findMany({})
		const prismaReplayClient = new PrismaClient()

		for await (const op of operations) {
			const params = op.params as unknown as Params
			const model = params.model.toLowerCase() as Lowercase<Params['model']>
			const action = params.action as keyof Prisma.PrismaAction
			const args = params.args
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore-next-line
			await prismaReplayClient[model][action](args)
		}

		prismaReplayClient.$disconnect
	},
}
