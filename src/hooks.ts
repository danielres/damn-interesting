import type { Handle } from '@sveltejs/kit'
import { getCurrentUserFromRequest } from './lib/request'

export const handle: Handle = async ({ event, resolve }) => {
	const user = await getCurrentUserFromRequest(event.request)
	event.locals = { ...event.locals, user }
	return resolve(event)
}
