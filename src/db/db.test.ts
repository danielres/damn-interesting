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
		const entryData = { url: 'URL', ownerId: '123' }
		await Entries.insert(entryData)

		const [dbEntry] = await Entries.list()
		expect(dbEntry.url).toEqual('URL')
		expect(dbEntry.id.length).toEqual(36)
	})
})
