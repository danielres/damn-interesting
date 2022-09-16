import cookie from 'cookie'
import { decryptObject } from './encryption'
import { Users } from '../db/db'

export const getCurrentUserFromRequest = async (request: Request) => {
	const cookies = request.headers.get('cookie')
	if (!cookies) return
	const { session: encryptedSession } = cookie.parse(cookies)
	if (!encryptedSession) return
	const { userId } = decryptObject(encryptedSession)
	const user = await Users.findById(userId)
	if (!user) return
	return user
}
