import bcrypt from 'bcryptjs'

export const compare = bcrypt.compare

const isTest = import.meta.env.MODE === 'test'
const isDev = import.meta.env.MODE === 'development'

export const hash = async (password: string) =>
	await bcrypt.hash(password, isTest || isDev ? 1 : 10)
