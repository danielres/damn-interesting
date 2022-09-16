export const makeUnauthorizedResponse = (message = 'Unauthorized') =>
	new Response(JSON.stringify([{ message }]), { status: 401 })
