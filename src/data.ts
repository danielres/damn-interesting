export type User = {
	id: string
	username: string
	email: string
	password: string
	emailVerifiedAt?: string
}
import { hash } from './lib/password'

export let users: User[] = [
	{
		id: '1',
		username: 'Jess',
		email: 'jess@example.com',
		password: '$2b$04$hL8PGFbNEHMW0E7a4sui3OXu3h8Velzebq5iNsP01L7nXRD9/IN.G',
		emailVerifiedAt: undefined,
	},
]

export const entries = [
	{ owner: '1', url: 'https://youtu.be/1G72936Y3xA' },
	{ owner: '1', url: 'https://youtu.be/Sk-_1UBskPw' },
	{ owner: '2', url: 'https://youtu.be/krlIYI8lcic' },
]

export const addUser = async (user: Omit<User, 'id'>) => {
	const username = user.username
	const email = user.email
	const password = await hash(user.password)
	const id = crypto.randomUUID()
	const emailVerifiedAt = new Date().toISOString()
	users = [...users, { id, username, email, password, emailVerifiedAt }]
	console.log({ users })
}
