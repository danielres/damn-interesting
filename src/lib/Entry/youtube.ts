import type { YoutubeVideoDetails } from './types'

import { env as public_env } from '$env/dynamic/public'
import { iso8601DurationToSeconds } from '$lib/time'

const YOUTUBE_DATA_API_KEY = public_env.PUBLIC_YOUTUBE_DATA_API_KEY
const YOUTUBE_DATA_API_URL = 'https://www.googleapis.com/youtube/v3/videos'

const YOUTUBE_OEMBED_API_URL = 'https://www.youtube.com/oembed'
const YOUTUBE_VIDEO_URL_REGEXP =
	/^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]{7,15})(?:[?&][a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+)*(?:[&/#].*)?$/

const getYoutubeVideoDuration = async (id: string) => {
	const url = `${YOUTUBE_DATA_API_URL}?id=${id}&key=${YOUTUBE_DATA_API_KEY}&part=contentDetails`
	const response = await fetch(url).then((res) => res.json())
	const iso8601Duration = response.items[0].contentDetails.duration
	const inSeconds = iso8601DurationToSeconds(iso8601Duration)
	return inSeconds
}

export const getYoutubeGetVideoDetails = async (url: string): Promise<YoutubeVideoDetails> => {
	if (!YOUTUBE_VIDEO_URL_REGEXP.test(url)) return Promise.reject('Youtube URL not valid')

	const response = await fetch(`${YOUTUBE_OEMBED_API_URL}?url=${url}&format=json`).then((res) =>
		res.json()
	)

	const resourceId = response.thumbnail_url.split('/vi/')[1].split('/')[0]

	let duration
	if (resourceId && YOUTUBE_DATA_API_KEY) {
		try {
			duration = await getYoutubeVideoDuration(resourceId)
		} catch (error) {
			console.log(error)
		}
	}

	const {
		author_name: authorName,
		author_url: authorUrl,
		thumbnail_url: thumbnailUrl,
		title,
	} = response

	return {
		authorName,
		authorUrl,
		duration,
		thumbnailUrl,
		title,
		url,
	}
}
