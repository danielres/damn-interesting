import { describe, expect, it } from 'vitest'
import { getBotUpdates, sendBotMessage, sendBotPhoto } from './telegram'

const RUN_TELEGRAM_TESTS = false

const PHOTO_URL =
	'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/A_focused_kitten_%28Pixabay%29.jpg/640px-A_focused_kitten_%28Pixabay%29.jpg'

describe('sendBotMessage()', () => {
	it.runIf(RUN_TELEGRAM_TESTS)('sends a message', async () => {
		const res = await sendBotMessage(
			`Hello from bot!\n__Markdown supported__: *bold*  **italic**.\n👉 [Reference](https://core.telegram.org/bots/api#formatting-options)`
		)
		expect(res?.success).toEqual(true)
	})
})

describe('sendBotPhoto()', () => {
	it.runIf(RUN_TELEGRAM_TESTS)('sends a photo', async () => {
		const res = await sendBotPhoto(PHOTO_URL, 'Oh! A *cuuute* kitten. Bot loves kittens!')
		expect(res?.success).toEqual(true)
	})
})

describe('getUpdates()', () => {
	it.runIf(RUN_TELEGRAM_TESTS)('gets latests updates received by the bot', async () => {
		const res = await getBotUpdates()
		expect(res?.success).toEqual(true)
	})
})
