import { describe, expect, it } from 'vitest'
import { getBotUpdates, sendBotMessage, sendBotPhoto, type Destination } from './telegram'

const RUN_TELEGRAM_TESTS = false

const TEST_PHOTO_URL = 'https://placekitten.com/240/240'

const TEST_TEXT = `Hello from bot!\n__Markdown supported__: *bold*  **italic**.\n👉 [Reference](https://core.telegram.org/bots/api#formatting-options)`

const DESTINATION: Destination = 'test_group'

describe('sendBotMessage()', () => {
	it.runIf(RUN_TELEGRAM_TESTS)('sends a message to a destination group', async () => {
		const res = await sendBotMessage(TEST_TEXT, DESTINATION)
		expect(res?.success).toEqual(true)
	})
})

describe('sendBotPhoto()', () => {
	it.runIf(RUN_TELEGRAM_TESTS)('sends a photo to a destination group', async () => {
		const res = await sendBotPhoto(
			TEST_PHOTO_URL,
			DESTINATION,
			'Oh! A *cuuute* kitten. Bot loves kittens!'
		)
		expect(res?.success).toEqual(true)
	})
})

describe('getUpdates()', () => {
	it.runIf(RUN_TELEGRAM_TESTS)('gets latests updates received by the bot', async () => {
		const res = await getBotUpdates()
		expect(res?.success).toEqual(true)
	})
})
