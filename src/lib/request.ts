import type { Cookies } from '@sveltejs/kit'

import { Users } from '../db/db'
import { decryptObject } from './encryption'

export const getCurrentUserFromCookies = async (cookies: Cookies) => {
	const encryptedSession = cookies.get('session')
	if (!encryptedSession) return undefined

	const { userId } = decryptObject(encryptedSession)
	const user = await Users.findById(userId)
	return user
}
