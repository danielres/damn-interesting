import { HTTP_CODES } from '$constants'
import { error } from '@sveltejs/kit'

type Routes = Record<string, Record<string, (arg0: App.Locals['user']) => boolean>>

export const routes: Routes = {
	'/v2': {
		GET: () => true,
	},
	'/v2/about': {
		GET: (user) => Boolean(user),
	},
	'/v2/auth/signin': {
		POST: (user) => Boolean(!user),
	},
	'/v2/auth/signout': {
		POST: (user) => Boolean(user),
	},
	'/v2/auth/renew': {
		POST: (user) => Boolean(user),
	},
	'/v2/entries': {
		GET: (user) => Boolean(user),
		POST: (user) => Boolean(user),
	},
	'/v2/entries/add': {
		GET: (user) => Boolean(user),
		POST: (user) => Boolean(user),
	},
	'/v2/entries/[id]': {
		GET: (user) => Boolean(user),
	},
	'/v2/tags': {
		GET: (user) => Boolean(user),
	},
}

export const canAccess = (routeId: string, user: App.Locals['user'], method: string) => {
	return Boolean(routes[routeId]?.[method](user))
}

export default (routeId: string, user: App.Locals['user'], method: string) => {
	if (user && canAccess(routeId, user, method)) return user
	throw error(HTTP_CODES.UNAUTHORIZED, 'Authorization required')
}
