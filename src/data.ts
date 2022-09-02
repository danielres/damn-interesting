export type User = {
	id: string
	email: string
	password: string
	username: string
	emailVerifiedAt?: string
	invitedAt?: string
	invitedBy?: string
}

export type Entry = {
	id: string
	ownerId: string
	url: string
	description: string
	createdAt?: string
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

export let entries: Entry[] = [
	{ id: '1', ownerId: '1', url: 'https://youtu.be/1G72936Y3xA', description: 'Description 1' },
	{ id: '2', ownerId: '1', url: 'https://youtu.be/Sk-_1UBskPw', description: 'Description 2' },
	{ id: '3', ownerId: '2', url: 'https://youtu.be/krlIYI8lcic', description: 'Description 3' },
]

export const addEntry = async (entry: Omit<Entry, 'id' | 'ownerId'>) => {
	const id = crypto.randomUUID()
	const ownerId = users[0].id
	const newEntry = {
		id,
		ownerId,
		url: entry.url,
		description: entry.description,
		createdAt: new Date().toISOString(),
	}
	entries = [...entries, newEntry]
	return newEntry
}

export const addUser = async (user: Omit<User, 'id'>) => {
	const id = crypto.randomUUID()
	const email = user.email
	const password = await hash(user.password)
	const username = user.username
	const emailVerifiedAt = new Date().toISOString()
	const invitedAt = user.invitedAt
	const invitedBy = user.invitedBy
	users = [
		...users,
		{
			id,
			email,
			password,
			username,
			emailVerifiedAt,
			invitedAt,
			invitedBy,
		},
	]
}
