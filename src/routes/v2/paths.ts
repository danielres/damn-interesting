import type { Page } from '@sveltejs/kit'

const base = '/v2'

export const to = {
	about: () => `${base}/about`,
	auth: {
		renew: () => `${base}/auth/renew`,
		signin: () => `${base}/auth/signin`,
		signout: () => `${base}/auth/signout`,
		signup: () => `${base}/auth/signup`,
		code: {
			generate: () => `${base}/auth/code/generate`,
			use: () => `${base}/auth/code/use`,
		},
	},
	entries: () => `${base}/entries`,
	entry: (id: string) => `${base}/entries/${id}`,
	search: (term: string, $page: Page) => {
		const newUrlSearchParams = new URLSearchParams($page.url.searchParams)
		newUrlSearchParams.set('q', term)
		return to.entries() + '?' + newUrlSearchParams
	},
	tags: () => `${base}/tags`,
}
