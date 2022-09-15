const toCamel = (str: string) =>
	str.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''))

const isObject = (obj: unknown) =>
	obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function'

type JSONValue = string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue>

export const keysToCamel = (obj: JSONValue): JSONValue => {
	if (isObject(obj)) {
		return Object.entries(obj).reduce(
			(acc, [k, v]: [string, JSONValue]) => ({ ...acc, [toCamel(k)]: keysToCamel(v) }),
			{}
		)
	}

	if (Array.isArray(obj)) return obj.map((i) => keysToCamel(i))

	return obj
}
