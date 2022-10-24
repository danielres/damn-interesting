type Id = string | number
type Value = any // eslint-disable-line @typescript-eslint/no-explicit-any

export class Cache {
	name: string
	maxSize: number
	values: Map<Id, { value: Value; maxAge: number }>
	defaultTtl: number

	constructor(name: string, maxSize = 10, defaultTtl = 60) {
		this.name = name
		this.maxSize = maxSize
		this.values = new Map()
		this.defaultTtl = defaultTtl
	}

	set(id: Id, value: Value, ttl = this.defaultTtl) {
		const keys = Array.from(this.values.keys())

		const size = keys.length
		const first = keys[0]

		if (size >= this.maxSize) this.values.delete(first)

		this.values.set(id, { value, maxAge: new Date().getTime() + ttl * 1000 })
	}

	get(id: Id) {
		const value = this.values.get(id)
		if (typeof value === 'undefined') return undefined

		const now = new Date().getTime()
		const maxAge = value.maxAge

		const isExpired = now > maxAge

		if (isExpired) {
			this.values.delete(id)
			return undefined
		}
		return this.values.get(id)?.value
	}

	has(id: Id) {
		return this.values.has(id)
	}

	get size() {
		return this.values.size
	}
}
