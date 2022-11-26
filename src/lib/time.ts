// Credits:
// Based on https://github.com/LinusU/node-parse-iso-duration

const WEEK_REGEXP = /^P([0-9]+W)$/
const DATETIME_REGEXP = /^P(([0-9]+Y)?([0-9]+M)?([0-9]+D)?)?(T([0-9]+H)?([0-9]+M)?([0-9]+S)?)?$/

export const iso8601DurationToSeconds = (str: string) => {
	const weekMatch = WEEK_REGEXP.exec(str)
	if (weekMatch) return parsePart('week', weekMatch[1])

	const matches = DATETIME_REGEXP.exec(str)

	if (matches)
		return (
			parsePart('date', matches[2]) +
			parsePart('date', matches[3]) +
			parsePart('date', matches[4]) +
			parsePart('time', matches[6]) +
			parsePart('time', matches[7]) +
			parsePart('time', matches[8])
		)

	throw new Error('Invalid duration')
}

const extractInt = (str: string) => parseInt(str.substring(0, str.length - 1), 10)

const parsePart = (mode: 'week' | 'date' | 'time', match: string) => {
	if (!match) return 0

	const int = extractInt(match)
	const id = mode + ' ' + match[match.length - 1]

	if (int === 0) return 0

	switch (id) {
		case 'time S':
			return int * 1
		case 'time M':
			return int * 60
		case 'time H':
			return int * 3600
		case 'date D':
			return int * 86400
		case 'week W':
			return int * 604800
		case 'date M':
		case 'date Y':
			throw new Error('Ambiguous duration')
	}

	return 0
}
