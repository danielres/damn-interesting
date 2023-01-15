import { z } from 'zod'

export const newEntry = z
	.object({
		url: z.string().url(),
		description: z
			.string()
			.trim()
			.min(15, 'Please share what YOU find particularly interesting in this content.'),
		duration: z.number(),
		authorName: z.string(),
		authorUrl: z.string(),
		title: z.string(),
		thumbnailUrl: z.string().url(),
		tags: z.array(z.string()).default([]),
		createdAt: z.date().default(new Date()),
	})
	.transform((obj) => ({
		...obj,
		id: obj.thumbnailUrl.split('/vi/')[1].split('/')[0],
	}))
