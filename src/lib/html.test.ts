import { highlight } from './html'
import { describe, expect, it } from 'vitest'

describe.concurrent('markMatch(string, string)', () => {
	it('wraps the matched substring with <mark>', () => {
		const actual = highlight('Hello there', 'hello')
		const expected = '<mark>Hello</mark> there'
		expect(expected).toEqual(actual)
	})

	it('results in a noop on unsafe match strings', () => {
		const actual = highlight('Lorem Ipsum;', 'Ipsum;')
		const expected = 'Lorem Ipsum;'
		expect(expected).toEqual(actual)
	})

	it('results in a noop when used on HTML', () => {
		const actual = highlight('<h1>Lorem</h1> Ipsum', 'h1')
		const expected = '<h1>Lorem</h1> Ipsum'
		expect(expected).toEqual(actual)
	})
})
