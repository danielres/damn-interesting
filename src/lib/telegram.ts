import { env as private_env } from '$env/dynamic/private'

const TOKEN = private_env.TELEGRAM_BOT_TOKEN
const CHAT_ID = private_env.TELEGRAM_CHAT_ID

export const sendBotMessage = async (text: string) => {
	if (!TOKEN || !CHAT_ID) return

	const apiUrl = `https://api.telegram.org/bot${TOKEN}/sendMessage`
	const res = await fetch(apiUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			parse_mode: 'markdown',
			chat_id: CHAT_ID,
			text,
		}),
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

export const sendBotPhoto = async (url: string, caption: string | undefined = undefined) => {
	if (!TOKEN || !CHAT_ID) return

	const apiUrl = `https://api.telegram.org/bot${TOKEN}/sendPhoto`
	const res = await fetch(apiUrl, {
		method: 'POST',
		body: new URLSearchParams({
			parse_mode: 'markdown',
			chat_id: CHAT_ID,
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

	return { success: true }
}
