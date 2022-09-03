import { beforeEach, describe, expect, it } from 'vitest'
import { delDbFile, Entries, getDb, initialState, Users } from './db'

beforeEach(async () => {
	await delDbFile()
})

describe('getDb()', () => {
	it('returns the db', async () => {
		const db = await getDb()
		expect(db.data).toEqual(initialState)
		await db.write()
	})
})

describe('Users.insert(), Users.list()', () => {
	it.only('inserts then retrieves a user', async () => {
		const userData = { username: 'Tom', email: 'tom@example.com', password: '123' }
		await Users.insert(userData)

		const [dbUser] = await Users.list()
		expect(dbUser.username).toEqual('Tom')
		expect(dbUser.id.length).toEqual(36)
	})
})

describe('Entries.insert(), Entries.list()', () => {
	it('inserts then retrieves an entry', async () => {
		const entryData = { url: 'URL', ownerId: '123' }
		await Entries.insert(entryData)

		const [dbEntry] = await Entries.list()
		expect(dbEntry.url).toEqual('URL')
		expect(dbEntry.id.length).toEqual(36)
	})
})
