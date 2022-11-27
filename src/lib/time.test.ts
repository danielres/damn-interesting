import { describe, expect, it } from 'vitest'
import { formatDuration, iso8601DurationToSeconds } from './time'

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

describe('formatDuration()', () => {
	it('formats a duration given in seconds', () => {
		expect(formatDuration(0)).toEqual('0 sec')
		expect(formatDuration(1)).toEqual('1 sec')
		expect(formatDuration(60)).toEqual('01:00')
		expect(formatDuration(61)).toEqual('01:01')
		expect(formatDuration(3600)).toEqual('01:00:00')
		expect(formatDuration(3660)).toEqual('01:01:00')
		expect(formatDuration(3661)).toEqual('01:01:01')
	})
})
