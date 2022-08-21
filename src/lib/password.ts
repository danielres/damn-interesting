import bcrypt from 'bcryptjs'
import { dev } from '$app/env'

export const compare = bcrypt.compare

export const hash = async (password: string) => await bcrypt.hash(password, dev ? 1 : 10)
