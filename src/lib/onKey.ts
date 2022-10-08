export const onKey = (key: 'Escape' = 'Escape', callback: () => void) => {
	const listener = (event: KeyboardEvent) => event.key === key && callback()
	addEventListener('keydown', listener)
	return () => removeEventListener('keydown', listener)
}
