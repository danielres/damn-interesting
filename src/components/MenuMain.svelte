<script lang="ts">
	import { page } from '$app/stores'

	$: active = $page.url.pathname.split('/')[1] || 'entries'
</script>

{#if ['entries', 'tags'].includes(active)}
	<div class="mx-auto grid space-x-8 self-end">
		<ul class="mx-auto flex gap-2">
			<li><a href="/" class:active={active === 'entries'}>Entries</a></li>
			<li><a href="/tags" class:active={active === 'tags'}>Tags</a></li>
		</ul>
	</div>
{/if}

<style lang="postcss">
	a {
		@apply opacity-60 transition-opacity;
		@apply rounded-lg bg-slate-900 px-2 py-1;
		&:hover {
			@apply opacity-80;
		}
		&.active {
			@apply opacity-100;
		}
	}
</style>
