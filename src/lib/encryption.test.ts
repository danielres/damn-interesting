import { describe, expect, it } from 'vitest'
import { encryptObject, decryptObject } from './encryption'

describe('encryptObject(), decryptObject()', () => {
	it('encrypts then decrypts and object', () => {
		const object = {
			email: 'jane!😀@example.com',
			invitedBy: 'Sébastien@example.com',
			invitedAt: new Date().toISOString(),
		}

		const encrypted = encryptObject(object)
		const decrypted = decryptObject(encrypted)

		expect(decrypted).toEqual(object)
	})
})
