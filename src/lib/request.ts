export const getFormEntriesFromRequest = async (request: Request) => {
	const formData = await request.formData()
	return JSON.parse(JSON.stringify(Object.fromEntries(formData)))
}

export const parseFormDataJson = async (request: Request) => {
	const values = (await request.formData()).get('json')
	if (typeof values !== 'string') return
	return JSON.parse(values)
}
