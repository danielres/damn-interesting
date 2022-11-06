<script lang="ts">
	const processExternalLink = (a: HTMLAnchorElement) => {
		if (a.host === location.host) return
		a.target = '_blank'
		a.rel = 'external noopener nofollow'
		a.classList.add('external')
	}

	const prose = (node: HTMLElement) => {
		for (const a of node.getElementsByTagName('a')) processExternalLink(a)
	}
</script>

<div use:prose class="prose prose-sm prose-invert">
	<slot />
</div>
