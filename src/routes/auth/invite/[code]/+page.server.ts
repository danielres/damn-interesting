import type { PageServerLoad } from './$types'

import { decryptObject } from '$lib/encryption'

export const load: PageServerLoad = ({ params }) => {
	const resp = decryptObject(params.code)
	return { ...resp, code: params.code }
}
