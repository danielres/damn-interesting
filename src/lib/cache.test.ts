import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Cache } from './cache'

describe('Cache', () => {
	it('works with defaults params', () => {
		const id = '123'
		const user = { id, username: 'Tom' }

		const cache = new Cache('users')
		cache.set(id, user)

		expect(cache.get(id)).toEqual(user)
	})

	it('supports a maxSize', () => {
		const cache = new Cache('users', 3)
		cache.set(1, { name: 'one' })
		cache.set(2, { name: 'two' })
		cache.set(3, { name: 'three' })
		cache.set(4, { name: 'four' })

		expect(cache.size).toEqual(3)
		expect(cache.get(1)).toBeUndefined()
	})

	describe('entries', () => {
		beforeEach(() => {
			vi.useFakeTimers()
		})

		afterEach(() => {
			vi.useRealTimers()
		})

		it('support individal ttl', () => {
			const cache = new Cache('users')

			const beginning = new Date(2000, 1, 1, 0, 0, 0)
			vi.setSystemTime(beginning)

			cache.set('1', { name: 'one minute' }, 60)
			cache.set('2', { name: 'two minutes' }, 120)

			expect(cache.get('1')).toEqual({ name: 'one minute' })
			expect(cache.get('2')).toEqual({ name: 'two minutes' })

			const after1Minute = new Date(2000, 1, 1, 0, 1, 1)
			vi.setSystemTime(after1Minute)

			expect(cache.get('1')).toBeUndefined()
			expect(cache.get('2')).toEqual({ name: 'two minutes' })

			const after2Minutes = new Date(2000, 1, 1, 0, 2, 1)
			vi.setSystemTime(after2Minutes)

			expect(cache.get('1')).toBeUndefined()
			expect(cache.get('2')).toBeUndefined()
		})
	})
})
