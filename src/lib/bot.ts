import type { Entry, Tag } from '@prisma/client'

import { dev } from '$app/environment'
import { SITE } from '$constants'
import { sendBotMessage } from '$lib/telegram'
import { formatDuration } from './time'

export const handleNewEntry = (
	username: string,
	entry: Entry & { taggings: { tag: Pick<Tag, 'name'> }[] }
) => {
	const tags = entry.taggings.map(({ tag }) => tag.name).join(', ')

	const duration = entry.duration ? formatDuration(entry.duration) : ''
	const thumbnail = `[.](${entry.thumbnailUrl})`
	const link = `[${entry.title}](${SITE.base_url}/entries/${entry.id})`
	const description = truncateString(entry.description, 128).replace(/\n/g, '')

	const message = `
⚡ ${username} just shared:
${link}${thumbnail} [[${duration}]]
📎 ${tags}

«_${description}_»
`

	sendBotMessage(message, dev ? 'test_group' : 'main_group')
}

// 🏷️📎

const truncateString = (str: string, num: number) =>
	str.length > num ? str.slice(0, num) + ' […]' : str
