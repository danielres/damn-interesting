import type { Entry } from '@prisma/client'

import { SITE } from '$constants'
import { sendBotMessage } from '$lib/telegram'

export const handleNewEntry = (username: string, entry: Entry) =>
	sendBotMessage(
		`⚡${username} just posted:⚡\n[${entry.title}](${SITE.base_url}/entries/${entry.id})`
	)
