export const getFormEntriesFromRequest = async (request: Request) => {
	const formData = await request.formData()
	return JSON.parse(JSON.stringify(Object.fromEntries(formData)))
}
