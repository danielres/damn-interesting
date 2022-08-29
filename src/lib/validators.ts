export type FormError = { field: string; message: string }
export type NewUserData = { username: string; email: string; password: string; password2: string }
export type NewUserFromCodeData = {
	username: string
	password: string
	password2: string
	code: string
}

export const newUser = async (newUserData: NewUserData) => {
	let errors: FormError[] = []
	const { username, email, password, password2 } = newUserData

	if (username.length < 3) errors = [...errors, { field: 'username', message: 'Too short' }]
	if (email.length < 3) errors = [...errors, { field: 'email', message: 'Too short' }]
	if (password.length < 3) errors = [...errors, { field: 'password', message: 'Too short' }]
	if (password !== password2) errors = [...errors, { field: 'password2', message: "Doesn't match" }]
	return errors
}

export const newUserFromCode = async (NewUserFromCodeData: NewUserFromCodeData) => {
	let errors: FormError[] = []
	const { username, password, password2, code } = NewUserFromCodeData

	if (!code) errors = [...errors, { field: 'code', message: 'Invitation code missing or invalid' }]
	if (username.length < 3) errors = [...errors, { field: 'username', message: 'Too short' }]
	if (password.length < 3) errors = [...errors, { field: 'password', message: 'Too short' }]
	if (password !== password2) errors = [...errors, { field: 'password2', message: "Doesn't match" }]
	return errors
}
