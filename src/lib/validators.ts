export type FormError = { field: string; message: string }
export type NewUserData = { username: string; email: string; password: string; password2: string }

export const newUser = async (newUserData: NewUserData) => {
	let errors: FormError[] = []
	const { username, email, password, password2 } = newUserData

	if (username.length < 3) errors = [...errors, { field: 'username', message: 'Too short' }]
	if (email.length < 3) errors = [...errors, { field: 'email', message: 'Too short' }]
	if (password.length < 3) errors = [...errors, { field: 'password', message: 'Too short' }]
	if (password !== password2) errors = [...errors, { field: 'password2', message: "Doesn't match" }]
	return errors
}
