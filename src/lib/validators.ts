import type { Entry } from '@prisma/client'
export type FormError = { field?: string; message: string }

import { dev } from '$app/environment'

const USER_PW_MIN_LENGTH = dev ? 4 : 8
const ENTRY_TITLE_MIN_LENGTH = 5

const serializeFormData = (formData: FormData): { [k: string]: string } =>
	JSON.parse(JSON.stringify(Object.fromEntries(formData.entries())))

export const newUser = (formData: FormData) => {
	const { username, email, password, password2 } = serializeFormData(formData)

	const errors: FormError[] = []
	if (username.length < 3) errors.push({ field: 'username', message: 'Too short' })
	if (email.length < 3) errors.push({ field: 'email', message: 'Too short' })
	if (password.length < USER_PW_MIN_LENGTH)
		errors.push({ field: 'password', message: `Too short (${USER_PW_MIN_LENGTH} chars min)` })
	if (password !== password2) errors.push({ field: 'password2', message: "Doesn't match" })
	return errors
}

export const newUserFromCode = (formData: FormData) => {
	const { username, password, password2, code } = serializeFormData(formData)

	const errors: FormError[] = []
	if (!code) errors.push({ field: 'code', message: 'Invitation code missing or invalid' })
	if (username.length < 3) errors.push({ field: 'username', message: 'Too short' })
	if (password.length < USER_PW_MIN_LENGTH)
		errors.push({ field: 'password', message: `Too short (${USER_PW_MIN_LENGTH} chars min)` })
	if (password !== password2) errors.push({ field: 'password2', message: "Doesn't match" })
	return errors
}

export const entry = (entry: Pick<Entry, 'title' | 'description'>) => {
	const { title, description } = entry
	const errors: FormError[] = []
	if (title.length < ENTRY_TITLE_MIN_LENGTH)
		errors.push({ field: 'title', message: `Should be min ${ENTRY_TITLE_MIN_LENGTH} characters.` })
	if (!description.trim())
		errors.push({
			field: 'description',
			message: 'Please tell us what YOU find particularly interesting in this content.',
		})
	if (description.includes('<'))
		errors.push({
			field: 'description',
			message: 'Sorry, HTML characters ("<", ">", ...), are not allowed.',
		})
	return errors
}
