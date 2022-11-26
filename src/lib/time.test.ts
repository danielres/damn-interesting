import { describe, expect, it } from 'vitest'
import { iso8601DurationToSeconds } from './time'

describe('iso8601DurationToSeconds()', () => {
	it('Converts ISO8601 duration strings to seconds', () => {
		expect(iso8601DurationToSeconds('PT8S')).toEqual(8)
		expect(iso8601DurationToSeconds('PT10M')).toEqual(10 * 60)
		expect(iso8601DurationToSeconds('PT20H')).toEqual(20 * 60 * 60)
		expect(iso8601DurationToSeconds('PT0H')).toEqual(0)
		expect(iso8601DurationToSeconds('PT1H26M28S')).toEqual(5188)

		expect(() => iso8601DurationToSeconds('Hello worlds')).toThrowError('Invalid duration')
		expect(() => iso8601DurationToSeconds('P10Y10M10D')).toThrowError('Ambiguous duration')
	})
})
