// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		prisma: import('@prisma/client').PrismaClient
		user: null | {
			id: string
			email: string
			username: string
			slug: string
			inviter: null | { username: string; slug: string }
			invitedAt: Date
		}
		// interface Platform {}
		// interface PrivateEnv {}
		// interface PublicEnv {}
		// interface Session {}
	}
}
