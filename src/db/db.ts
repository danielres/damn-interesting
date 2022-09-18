import type { EntryDbInput, EntryDbRecord, EntryView, UserDbInput, UserDbRecord } from './types'

import { slugify } from '$lib/string'
import { randomUUID } from 'crypto'
import { JSONFile, Low } from 'lowdb'
import * as fs from 'node:fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { getYoutubeGetVideoDetails } from '../lib/Entry/youtube'
import { doesFileExist } from '../lib/fs'
import { hash } from '../lib/password'

type Data = {
	users: UserDbRecord[]
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
			createdAt: new Date().toISOString(),
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
		const owners = (await Promise.all(ownerIds.map((id) => Users.findById(id)))) as UserDbRecord[]

		const withOwnerDetails = entries.map(({ ownerId, ...rest }) => {
			const owner = owners.find((o) => o.id === ownerId)
			if (!owner) throw new Error(`Owner not found for entry ${rest.id} "${rest.title}"`)
			const { username, slug } = owner

			const entryView: EntryView = {
				...rest,
				owner: {
					username,
					slug,
				},
			}
			return entryView
		})
		const sorted = withOwnerDetails.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
		return sorted
	},
	listByOwnerSlug: async (ownerSlug: UserDbRecord['slug']) => {
		const all = await Entries.list()
		const filtered = all.filter((e) => e.owner.slug === ownerSlug)
		return filtered
	},
}

export const Users = {
	insert: async (userData: UserDbInput) => {
		const newUser = {
			email: userData.email,
			id: userData.id ?? randomUUID(),
			invitedAt: userData.invitedAt,
			invitedById: userData.invitedById,
			password: await hash(userData.password),
			username: userData.username,
			slug: slugify(userData.username),
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
	findByEmail: async (email: UserDbRecord['email']) => {
		const db = await getDb()
		const users = db.data?.users ?? []
		const user = users.find((u) => u.email === email)
		return user
	},
	findById: async (id: UserDbRecord['id']) => {
		const db = await getDb()
		const users = db.data?.users ?? []
		const user = users.find((u) => u.id === id)
		if (!user) throw new Error(`User ${id} not found`)
		return user
	},
	findByUsername: async (username: UserDbRecord['username']) => {
		const db = await getDb()
		const users = db.data?.users ?? []
		const user = users.find((u) => u.username === username)
		return user
	},
	findBySlug: async (slug: UserDbRecord['slug']) => {
		const db = await getDb()
		const users = db.data?.users ?? []
		const user = users.find((u) => u.slug === slug)
		return user
	},
}

export const populateUser = async (
	user: Pick<UserDbRecord, 'id' | 'email' | 'slug' | 'username' | 'invitedAt' | 'invitedById'>
) => {
	const { invitedById, ...rest } = user

	const inviterUser = await Users.findById(invitedById)
	const inviterUserView = {
		username: inviterUser.username,
		slug: inviterUser.slug,
	}

	return {
		...rest,
		invitedBy: inviterUserView,
	}
}
