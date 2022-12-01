import { env as private_env } from '$env/dynamic/private'

const TOKEN = private_env.TELEGRAM_BOT_TOKEN
const CHAT_ID_MAIN = private_env.TELEGRAM_CHAT_ID_MAIN
const CHAT_ID_TEST = private_env.TELEGRAM_CHAT_ID_TEST
const CHAT_ID_ADMIN = private_env.TELEGRAM_CHAT_ID_ADMIN

export type Destination = 'test_group' | 'main_group' | 'admin_group'

const getChatId = (destination: Destination) =>
	destination === 'main_group'
		? CHAT_ID_MAIN
		: destination === 'admin_group'
		? CHAT_ID_ADMIN
		: CHAT_ID_TEST

export const sendBotMessage = async (text: string, destination: Destination) => {
	if (!TOKEN) return

	const chat_id = getChatId(destination)

	const apiUrl = `https://api.telegram.org/bot${TOKEN}/sendMessage`
	const res = await fetch(apiUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({ parse_mode: 'markdown', chat_id, text }),
	})

	if (!res.ok) {
		const { error_code, description } = await res.json()
		console.log(
			`Error: sendBotMessage(): Telegram request failed, code: ${error_code}: "${description}"`
		)
		return { success: false, error: { code: error_code, description } }
	}

	return { success: true }
}

export const sendBotPhoto = async (
	url: string,
	destination: Destination,
	caption: string | undefined = undefined
) => {
	if (!TOKEN || !CHAT_ID_TEST) return

	const chat_id = getChatId(destination)

	const apiUrl = `https://api.telegram.org/bot${TOKEN}/sendPhoto`
	const res = await fetch(apiUrl, {
		method: 'POST',
		body: new URLSearchParams({
			parse_mode: 'markdown',
			chat_id,
			...(caption ? { caption } : {}),
			photo: url,
		}),
	})

	if (!res.ok) {
		const { error_code, description } = await res.json()
		console.log(
			`Error: sendBotPhoto(): Telegram request failed, code: ${error_code}: "${description}"`
		)
		return { success: false, error: { code: error_code, description } }
	}

	return { success: true }
}

export const getBotUpdates = async () => {
	if (!TOKEN) return

	const apiUrl = `https://api.telegram.org/bot${TOKEN}/getUpdates`
	const res = await fetch(apiUrl)

	if (!res.ok) {
		const { error_code, description } = await res.json()
		console.log(
			`Error: getUpdates(): Telegram request failed, code: ${error_code}: "${description}"`
		)
		return { success: false, error: { code: error_code, description } }
	}

	return { success: true, data: await res.json() }
}
