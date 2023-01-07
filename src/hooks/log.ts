import type { Handle } from '@sveltejs/kit'

export const log: Handle = async ({ event, resolve }) => {
	const url = new URL(event.request.url)
	const path = url.pathname + url.href.split(url.pathname)[1]
	const user = event.locals.user?.slug

	const t0 = performance.now()
	const resolved = await resolve(event)
	const t1 = performance.now()
	const t = (t1 - t0).toFixed() + 'ms'
	const result = [
		t.padEnd(6),
		event.request.method.padEnd(6),
		event.route.id?.padEnd(20),
		path.padEnd(30),
		user,
	]
		.filter((e) => e)
		.join(' \x1b[35m|\x1b[0m ')
	console.log(result)
	return resolved
}
