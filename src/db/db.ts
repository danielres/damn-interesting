import { randomUUID } from 'crypto'
import { JSONFile, Low } from 'lowdb'
import * as fs from 'node:fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

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
	description?: string
	createdAt?: string
}

type Data = {
	users: User[]
	entries: Entry[]
}

export const initialState: Data = { users: [], entries: [] }

export const getDbPath = () => {
	const __dirname = dirname(fileURLToPath(import.meta.url))
	const path = join(__dirname, `db.${import.meta.env.MODE}.json`)
	return path
}

export const delDbFile = async () => {
	const file = getDbPath()
	return new Promise((resolve) =>
		fs.exists(file, (exists) => {
			exists ? fs.unlink(file, () => resolve(undefined)) : resolve(undefined)
		})
	)
}

export const getDb = async () => {
	const path = getDbPath()
	const adapter = new JSONFile<Data>(path)
	const db = new Low(adapter)
	await db.read()
	db.data ||= initialState
	return db
}

export const Entries = {
	insert: async (entryData: Omit<Entry, 'id'>) => {
		const newEntry = {
			id: randomUUID(),
			...entryData,
		}
		const db = await getDb()
		db.data?.entries.push(newEntry)
		await db.write()
	},
	list: async () => {
		const db = await getDb()
		return db.data?.entries ?? []
	},
}

export const Users = {
	insert: async (userData: Omit<User, 'id'>) => {
		const newUser = { id: randomUUID(), ...userData }
		const db = await getDb()
		db.data?.users.push(newUser)
		await db.write()
	},
	list: async () => {
		const db = await getDb()
		return db.data?.users ?? []
	},
}
