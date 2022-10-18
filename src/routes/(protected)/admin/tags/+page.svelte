<script lang="ts" scope="module">
	import type { PageData } from './$types'

	export let data: PageData

	$: tags = data.admin.tags
</script>

<div class="mx-auto max-w-3xl">
	<ul class="flex flex-wrap gap-2">
		{#each tags as tag}
			<li>
				<a class="rounded-lg bg-slate-900 py-1 px-2" href="/admin/tags/{tag.id}">
					{tag.name}
				</a>
			</li>
		{/each}
	</ul>
</div>
