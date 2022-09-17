import type { YoutubeVideoDetails } from '$lib/Entry/types'

import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { delDbFile, Entries, getDb, initialState, Users } from './db'

const fixtures: {
	youtubeVideoDetails: YoutubeVideoDetails
} = {
	youtubeVideoDetails: {
		authorName: '[AUTHOR-NAME]',
		authorUrl: '[AUTHOR-URL]',
		height: 100,
		providerName: 'YouTube',
		thumbnailHeight: 100,
		thumbnailUrl: 'https://i.ytimg.com/vi/1G72936Y3xA/hqdefault.jpg',
		thumbnailWidth: 100,
		title: 'Lorem',
		resourceType: 'video',
		width: 100,
	},
}

vi.mock('../lib/Entry/youtube', () => ({
	getYoutubeGetVideoDetails: async () => fixtures.youtubeVideoDetails,
}))

beforeEach(async () => {
	await delDbFile()
})

afterAll(() => {
	vi.restoreAllMocks()
})

describe('getDb()', () => {
	it('returns the db', async () => {
		const db = await getDb()
		expect(db.data).toEqual(initialState)
		await db.write()
	})
})

describe('Users.insert(), Users.list()', () => {
	it('inserts then retrieves a user', async () => {
		const userData = {
			username: 'Tom',
			email: 'tom@example.com',
			password: 'pass',
		}
		await Users.insert(userData)

		const [listedUser] = await Users.list()
		expect(listedUser.username).toEqual('Tom')
		expect(listedUser.id.length).toEqual(36)
		expect(listedUser).not.toHaveProperty('password')
	})
})

describe('Entries.insert(), Entries.list()', () => {
	it('inserts then retrieves an entry', async () => {
		const userData = {
			username: 'Tom',
			email: 'tom@example.com',
			password: 'pass',
		}
		await Users.insert(userData)
		const [user] = await Users.list()

		const entryData = {
			url: 'https://youtu.be/123',
			ownerId: user.id,
			description: 'Lorem',
		}
		await Entries.insert(entryData)

		const [dbEntry] = await Entries.list()
		expect(dbEntry.url).toEqual(entryData.url)
		expect(dbEntry.id.length).toEqual(11)
	})
})
