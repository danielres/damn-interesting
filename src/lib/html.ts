export const highlight = (str = '', match: string | null | undefined = '', tag = 'mark') => {
	if (!match) return str

	const isSafeMatch = /^[a-zA-Z0-9_\- ]*$/.test(match)
	if (!isSafeMatch) {
		console.error({ match, isSafeMatch })
		return str
	}

	const isSafeStr = !str.includes('<')
	if (!isSafeStr) {
		console.error({ str, isSafeStr })
		return str
	}

	const re = new RegExp(`(${match})`, 'gi')
	return str.replace(re, `<${tag}>$1</${tag}>`)
}
