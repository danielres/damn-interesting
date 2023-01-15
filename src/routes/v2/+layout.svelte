<script lang="ts">
	import '../../app.postcss'

	import { browser } from '$app/environment'
	import LinkBackTotop from '$components/LinkBackTotop.svelte'
	import Nav from '$components2/Nav.svelte'
	import VanishingHeader from '$components2/VanishingHeader.svelte'
	import { auth } from './auth/$auth'
	import Entries from './components/Entries.svelte'

	if (browser) {
		auth.keepAlive()
		document.onfocus = auth.renew
	}
</script>

<div class="mt-20 py-6 sm:px-6">
	<Entries />
</div>

<LinkBackTotop />

<VanishingHeader vanish={true}>
	<Nav />
</VanishingHeader>

<slot />
