import { tick } from 'svelte'

export const portal = (node: HTMLElement, selector = 'body') => {
	const update = async (newSelector: string) => {
		selector = newSelector
		await tick()
		const element = document.querySelector(selector)

		if (!element) {
			console.error(`Target element ${selector} not found`)
			return
		}

		element.appendChild(node)
	}

	const destroy = () => {
		if (node.parentNode) node.parentNode.removeChild(node)
	}

	update(selector)

	return {
		update,
		destroy,
	}
}
