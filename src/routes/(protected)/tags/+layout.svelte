<script lang="ts">
	import type { LayoutData } from './$types'

	import { page } from '$app/stores'

	export let data: LayoutData

	$: tags = data.tags
	$: name = $page.params.name
	const max = Math.max(...data.tags.map((t) => t.taggings.length))
	const getOpacity = (count: number) => ((100 / max) * count * (2 / 3) + 100 / 3) / 100
</script>

<div class="mx-auto my-6 grid max-w-4xl gap-8">
	{#if tags}
		<ul class="flex flex-wrap justify-center gap-2 text-sm">
			{#each tags as tag (tag.id)}
				{@const count = tag.taggings.length}
				<li>
					<span>
						<a
							href="/tags/{tag.name}"
							style="opacity: {getOpacity(count)}; font-size: {getOpacity(count) + 0.2}rem"
							class:active={name === tag.name}
							class="badge  border border-slate-800 bg-slate-600"
						>
							<span>{tag.name}</span>
						</a>
					</span>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<div class="mx-auto grid max-w-7xl gap-4 py-2 px-2 sm:px-8 ">
	<slot />
</div>

<style lang="postcss">
	a:hover {
		opacity: 100 !important;
		@apply border border-slate-400;
	}
	a.active {
		opacity: 100 !important;
		@apply pointer-events-none border border-slate-400;
	}
</style>
