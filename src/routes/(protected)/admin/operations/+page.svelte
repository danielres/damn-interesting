<script lang="ts">
	import type { PageData } from './$types'

	import { format } from '$lib/date'

	export let data: PageData

	$: operations = data.admin.operations

	const getData = (operation: any) => {
		const {
			//
			height,
			resourceType,
			thumbnailHeight,
			thumbnailWidth,
			width,
			providerName,
			authorUrl,
			...values
		} = operation.params?.args.data
		return values
	}
	const getWhere = (operation: any) => operation.params?.args.where
</script>

<div class="grid divide-y divide-white/20 card p-0 overflow-hidden">
	{#each operations as operation}
		<a class="row" href={`/admin/operations/${operation.id}`}>
			<div class="bg-black/10 py-2 px-4">
				<div class="opacity-50">{operation.id} | {format(operation.executedAt)}</div>
				<div class="flex gap-4">
					<div>{operation.model}</div>
					<div>{operation.action}</div>
					<div>{JSON.stringify(getWhere(operation)) ?? ''}</div>
				</div>
			</div>
			<div class="md:grid grid-cols-2 py-2 px-4">
				{#each Object.entries(getData(operation)) as [k, v]}
					<div class=""><b>{k}</b></div>
					<div class="">{v}</div>
				{/each}
			</div>
		</a>
	{/each}
</div>

<style lang="postcss">
	a.row {
		&:hover {
			@apply bg-black/20 transition-colors;
		}
	}
</style>
