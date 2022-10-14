<script lang="ts" scope="module">
	import type { PageData } from './$types'

	export let data: PageData

	$: tags = data.admin.tags
</script>

<div class="max-w-3xl mx-auto">
	<ul class="flex gap-2 flex-wrap">
		{#each tags as tag}
			<li>
				<a class="bg-slate-900 py-1 px-2 rounded-lg" href="/admin/tags/{tag.id}">
					{tag.name}
				</a>
			</li>
		{/each}
	</ul>
</div>
