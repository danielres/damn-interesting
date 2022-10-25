<script lang="ts">
	import type { LayoutData } from './$types'

	import { page } from '$app/stores'

	export let data: LayoutData

	$: tags = data.tags
	$: name = $page.params.name
</script>

<div class="mx-auto my-4 grid max-w-4xl gap-12">
	{#if tags}
		<ul class="flex flex-wrap justify-center gap-2 text-sm">
			{#each tags as tag (tag.id)}
				<li
					class="badge {name === tag.name
						? 'pointer-events-none ring ring-black/50'
						: 'opacity-70 hover:opacity-100'}"
				>
					<span>
						<a href="/tags/{tag.name}" class="inline-block">
							{tag.name}
						</a>
						<span class="text-xs opacity-50">
							({tag.taggings.length})
						</span>
					</span>
				</li>
			{/each}
		</ul>
	{/if}

	<slot />
</div>
