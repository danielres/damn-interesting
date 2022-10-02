import type { CurrentUserView } from '$types'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		user: <CurrentUserView>locals.user,
		can: {
			signup: await locals.can.signup(),
		},
	}
}
