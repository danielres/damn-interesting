import { invalidateAll } from '$app/navigation'
import { page } from '$app/stores'
import { COOKIES } from '$constants'
import { onInterval } from '$lib/interval'
import { to } from '$paths'
import { derived, get } from 'svelte/store'

const user = derived(page, ($page) => ({ user: $page.data.user }))

const signout = async () => {
	await fetch(to.auth.signout(), { method: 'POST' })
	invalidateAll()
}

const renew = async () => {
	if (!get(user)) return
	const response = await fetch(to.auth.renew(), { method: 'POST' })
	const { type } = await response.json()
	if (type !== 'success') invalidateAll()
}

const keepAlive = () => {
	onInterval(renew, (COOKIES.session.maxAge * 1000) / 3)
}

export const auth = {
	...user,
	keepAlive,
	renew,
	signout,
}
