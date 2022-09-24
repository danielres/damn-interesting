export type FormError = { field: string; message: string }

const serializeFormData = (formData: FormData): { [k: string]: string } =>
	JSON.parse(JSON.stringify(Object.fromEntries(formData.entries())))

export const newUser = (formData: FormData) => {
	const { username, email, password, password2 } = serializeFormData(formData)

	const errors: FormError[] = []
	if (username.length < 3) errors.push({ field: 'username', message: 'Too short' })
	if (email.length < 3) errors.push({ field: 'email', message: 'Too short' })
	if (password.length < 3) errors.push({ field: 'password', message: 'Too short' })
	if (password !== password2) errors.push({ field: 'password2', message: "Doesn't match" })
	return errors
}

export const newUserFromCode = (formData: FormData) => {
	const { username, password, password2, code } = serializeFormData(formData)

	const errors: FormError[] = []
	if (!code) errors.push({ field: 'code', message: 'Invitation code missing or invalid' })
	if (username.length < 3) errors.push({ field: 'username', message: 'Too short' })
	if (password.length < 3) errors.push({ field: 'password', message: 'Too short' })
	if (password !== password2) errors.push({ field: 'password2', message: "Doesn't match" })
	return errors
}
