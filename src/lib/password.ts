import bcrypt from 'bcryptjs'

export const compare = bcrypt.compare

const isTest = import.meta.env.MODE === 'test'

export const hash = async (password: string) => await bcrypt.hash(password, isTest ? 1 : 10)
