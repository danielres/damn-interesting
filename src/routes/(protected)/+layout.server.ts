import { getCurrentUserFromCookies } from '$lib/request'
import pick from 'lodash.pick'
import type { CurrentUserView } from 'src/db/types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
	const dbUser = await getCurrentUserFromCookies(event.cookies)

	if (!dbUser) return

	const currentUserView: CurrentUserView = pick(dbUser, [
		'id',
		'email',
		'username',
		'slug',
		'invitedById',
		'invitedAt',
	])

	return {
		user: currentUserView,
	}
}
