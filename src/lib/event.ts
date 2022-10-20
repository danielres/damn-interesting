export const debounce = (cb: (...args: any[]) => void, delay = 250) => {
	let timeout: NodeJS.Timeout
	return (...args: unknown[]) => {
		clearTimeout(timeout)
		timeout = setTimeout(() => cb(...args), delay)
	}
}
