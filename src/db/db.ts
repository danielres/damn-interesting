import type { EntryDbInput, EntryDbRecord, User } from './types'

import { randomUUID } from 'crypto'
import { JSONFile, Low } from 'lowdb'
import * as fs from 'node:fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { getYoutubeGetVideoDetails } from '../lib/Entry/youtube'
import { doesFileExist } from '../lib/fs'
import { hash } from '../lib/password'

type Data = {
	users: User[]
	entries: EntryDbRecord[]
}

export const initialState: Data = { users: [], entries: [] }

export const getDbPath = () => {
	const __dirname = dirname(fileURLToPath(import.meta.url))
	const path = join(__dirname, `db.${import.meta.env.MODE}.json`)
	return path
}

export const delDbFile = async () => {
	const file = getDbPath()
	const exists = await doesFileExist(file)
	if (exists) await fs.promises.unlink(file)
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
	insert: async (entryInput: EntryDbInput) => {
		const youtubeVideoDetails = await getYoutubeGetVideoDetails(entryInput.url)

		const resourceId = youtubeVideoDetails.thumbnailUrl.split('/vi/')[1].split('/')[0]

		const newEntry: EntryDbRecord = {
			id: resourceId,
			...entryInput,
			...youtubeVideoDetails,
		}

		const db = await getDb()
		db.data?.entries.push(newEntry)
		await db.write()
		return newEntry
	},
	list: async () => {
		const db = await getDb()
		const entries = db.data?.entries
		if (!entries) return []

		const ownerIds = [...new Set(entries.map((e) => e.ownerId))]
		const owners = (await Promise.all(ownerIds.map((id) => Users.findById(id)))) as User[]

		const entriesWithOwnerDetails = entries.map(({ ownerId, ...rest }) => {
			const owner = owners.find((o) => o.id === ownerId) as User
			const { username } = owner
			return {
				...rest,
				owner: {
					username,
				},
			}
		})

		return entriesWithOwnerDetails
	},
}

export const Users = {
	insert: async (userData: Omit<User, 'id'>) => {
		const newUser = {
			email: userData.email,
			id: randomUUID(),
			invitedAt: userData.invitedAt,
			invitedBy: userData.invitedBy,
			password: await hash(userData.password),
			username: userData.username,
		}
		const db = await getDb()
		db.data?.users.push(newUser)
		await db.write()
	},
	list: async () => {
		const db = await getDb()
		const users = db.data?.users ?? []
		return users.map(({ password, ...rest }) => rest) // eslint-disable-line @typescript-eslint/no-unused-vars
	},
	findByEmail: async (email: string) => {
		const db = await getDb()
		const users = db.data?.users ?? []
		const user = users.find((u) => u.email === email)
		return user
	},
	findById: async (id: string) => {
		const db = await getDb()
		const users = db.data?.users ?? []
		const user = users.find((u) => u.id === id)
		return user
	},
	findByUsername: async (username: string) => {
		const db = await getDb()
		const users = db.data?.users ?? []
		const user = users.find((u) => u.username === username)
		return user
	},
}
