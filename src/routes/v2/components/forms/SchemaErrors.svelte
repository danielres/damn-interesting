<script lang="ts">
	type Errors =
		//  Conforms to Zod FlattenedErrors format
		| undefined
		| {
				[x: string]: string[] | undefined
				[x: number]: string[] | undefined
				[x: symbol]: string[] | undefined
		  }

	export let errors: Errors
</script>

{#if errors}
	<dl
		class="shadow-lg; m-0 grid grid-cols-[auto_1fr] gap-2 rounded bg-red-700/50 p-2 text-sm text-white/70"
	>
		{#each Object.entries(errors) as [label, messages]}
			{#if messages}
				<dt class="font-semibold">{label}:</dt>
				<dd>
					<ul>
						{#each messages as message}
							<li>{@html message}</li>
						{/each}
					</ul>
				</dd>
			{/if}
		{/each}
	</dl>
{/if}
