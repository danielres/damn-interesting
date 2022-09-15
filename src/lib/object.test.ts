import * as object from './object'

import { describe, it, expect } from 'vitest'

describe('object.keysToCamel()', () => {
	it("converts an object's keys to camelCase", () => {
		const obj = {
			user_one: {
				user_details: {
					first_name: 'xyz',
					last_name: 'abc',
					groups: [
						{ id: 1, group_type: 'EXT' },
						{ id: 2, group_type: 'INT' },
					],
					address_type: { city_name: 'berlin', state: { code_name: 'BR', name: 'Brandenburg' } },
				},
			},
		}

		const actual = object.keysToCamel(obj)

		const expected = {
			userOne: {
				userDetails: {
					firstName: 'xyz',
					lastName: 'abc',
					groups: [
						{ id: 1, groupType: 'EXT' },
						{ id: 2, groupType: 'INT' },
					],
					addressType: { cityName: 'berlin', state: { codeName: 'BR', name: 'Brandenburg' } },
				},
			},
		}

		expect(actual).toEqual(expected)
	})
})
