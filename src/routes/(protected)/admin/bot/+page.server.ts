import type { Destination } from '$lib/telegram'
import type { FormError } from '$lib/validators'
import type { Actions, PageServerLoad } from './$types'

import { HTTP_CODES } from '$constants'
import { can } from '$lib/can'
import { getFormEntriesFromRequest } from '$lib/request'
import * as telegram from '$lib/telegram'
import { fail } from '@sveltejs/kit'

export const load: PageServerLoad = async () => {
	const botUpdates = await telegram.getBotUpdates()

	return {
		admin: { updates: botUpdates?.data?.result },
	}
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const errors: FormError[] = []

		const canSendTelegramMessage = can.sendTelegramMessage(locals.user)

		if (!canSendTelegramMessage) {
			errors.push({ message: 'User not allowed to send telegram messages.' })
			return fail(HTTP_CODES.FORBIDDEN, { errors })
		}

		const entries = await getFormEntriesFromRequest(request)

		const destination: Destination = entries.destination
		const message: string = entries.message

		try {
			const response = await telegram.sendBotMessage(message, destination)
			return response?.success ? { success: true } : { success: false, error: response?.error }
		} catch (error) {
			console.log(error)
			return { success: false, error }
		}
	},
}
