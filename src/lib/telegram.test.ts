import { describe, expect, it } from 'vitest'
import { sendBotMessage } from './telegram'

describe('sendBotMessage()', () => {
	it('sends a message', async () => {
		const res = await sendBotMessage(`Hello from the bot`)

		expect(res?.success).toEqual(true)
	})
})
