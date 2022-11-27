import { env as private_env } from '$env/dynamic/private'

const TOKEN = private_env.TELEGRAM_BOT_TOKEN
const CHAT_ID = private_env.TELEGRAM_CHAT_ID

export const sendBotMessage = async (text: string) => {
	if (!TOKEN || !CHAT_ID) return

	const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			chat_id: CHAT_ID,
			text,
		}),
	})

	if (!res.ok) {
		const { error_code, description } = await res.json()
		console.error(`Error: Telegram request failed, code: ${error_code}: ${description}`)
		return { success: false, error: { code: error_code, description } }
	}

	return { success: true }
}
