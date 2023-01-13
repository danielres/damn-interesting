export const slugify = (string: string) => {
	const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
	const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
	const p = new RegExp(a.split('').join('|'), 'g')

	return string
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
		.replace('æ', 'ae') // Replaces ligatures
		.replace('œ', 'oe') // Replaces ligatures
		.replace(/’/, '-')
		.replace(/&/g, '-and-') // Replace & with 'and'
		.replace(/[^\w-]+/g, '') // Remove all non-word characters
		.replace(/--+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, '') // Trim - from end of text
}

export const truncate = (string: string, length = 30) => string.substring(0, length) + '…'

export const capitalizeFirst = (string?: string) =>
	string ? string.charAt(0).toUpperCase() + string.slice(1) : string

export const sanitizeInputValue = (string?: string, { trimEnd } = { trimEnd: true }) => {
	if (!string) return string
	const result = string
		.trimStart()
		.replace(/\s\s+/g, ' ') // Collapses multiple spaces
		.replace(/[^\w\s()-]/g, '') // Removes anything that is NOT a word character, space character, or allowed chars

	return trimEnd ? result.trimEnd() : result
}
