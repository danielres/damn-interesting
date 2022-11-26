import type { YoutubeVideoDetails } from './types'

const YOUTUBE_URL_REGEXP =
	/^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]{7,15})(?:[?&][a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+)*(?:[&/#].*)?$/

export const getYoutubeGetVideoDetails = async (url: string): Promise<YoutubeVideoDetails> => {
	if (!YOUTUBE_URL_REGEXP.test(url)) return Promise.reject('Youtube URL not valid')

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
