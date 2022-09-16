import type { YoutubeVideoDetails } from './types'

export const getYoutubeGetVideoDetails = async (url: string): Promise<YoutubeVideoDetails> => {
	const response = await fetch(`https://www.youtube.com/oembed?url=${url}&format=json`).then(
		(res) => res.json()
	)

	const {
		author_name: authorName,
		author_url: authorUrl,
		height,
		provider_name: providerName,
		thumbnail_height: thumbnailHeight,
		thumbnail_url: thumbnailUrl,
		thumbnail_width: thumbnailWidth,
		title,
		type: resourceType,
		width,
	} = response

	return {
		authorName,
		authorUrl,
		height,
		providerName,
		thumbnailHeight,
		thumbnailUrl,
		thumbnailWidth,
		title,
		resourceType,
		width,
	}
}
