<script lang="ts">
	import { browser, dev } from '$app/environment'
	import { applyAction, enhance, type SubmitFunction } from '$app/forms'
	import { goto } from '$app/navigation'

	import { page } from '$app/stores'
	import TextareaAutogrow from '$components/forms/TextareaAutogrow2.svelte'
	import { to } from '$paths'
	import { reload as reloadEntries } from '$components2/Entries/entries'
	import { onMount, tick } from 'svelte'
	import { fade } from 'svelte/transition'
	import EntryItem from '../../components/EntryItem.svelte'
	import PageFormErrors from '../../../components/forms/PageFormErrors.svelte'
	import {
		devResourceIds,
		newEntryPreview,
		resetAll,
		url,
		values,
		youtubeVideoDetails,
	} from './FormEntryAdd/$stores'
	import TagInputAutocomplete from './FormEntryAdd/TagInputAutocomplete2.svelte'

	$: errors = $page.form?.errors || {}

	let inputUrl: HTMLInputElement
	let inputTitle: HTMLInputElement

	let tags: string[] = []

	$: if (browser && !$url) tick().then(() => inputUrl.focus())
	$: if (browser && $youtubeVideoDetails) tick().then(() => inputTitle.focus())

	onMount(async () => {
		await tick()
		resetAll()
	})

	const handleForm: SubmitFunction = ({ data }) => {
		data.append('json', JSON.stringify($values))

		return async ({ result }) => {
			applyAction(result)
			if (result.type === 'success') {
				reloadEntries()
				await tick()
				goto(to.entries())
			}
		}
	}
</script>

<div class="grid gap-6">
	<form>
		<fieldset disabled={Boolean($youtubeVideoDetails)}>
			<label class:hasError={errors.url}>
				<span class="flex gap-8">
					Youtube URL
					{#if dev}
						<ul class="flex gap-2 text-slate-900">
							{#each devResourceIds as resourceId, i}<li>
									<button
										on:click|preventDefault={() =>
											($url = 'https://www.youtube.com/watch?v=' + resourceId)}
									>
										{i + 1}
									</button>
								</li>
							{/each}
						</ul>
					{/if}
				</span>

				<input bind:this={inputUrl} type="text" bind:value={$url} />
			</label>
			<pre />
		</fieldset>
	</form>

	<hr class="border-slate-900/20" />
	<form method="POST" use:enhance={handleForm}>
		<fieldset
			class="grid w-full gap-6 max-sm:flex-col sm:grid-cols-[minmax(auto,360px)_360px]"
			disabled={!$youtubeVideoDetails}
		>
			<!-- COL1 -->
			<div class="grid gap-6">
				<div class="flex flex-col gap-6">
					<label class:hasError={errors.title}>
						<span>Title</span>
						<div class="field">
							<input
								bind:this={inputTitle}
								bind:value={$values.title}
								class="text-sm"
								type="text"
								placeholder="Title"
							/>
						</div>
					</label>

					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class:hasError={errors.description}>
						<span>Description</span>
						<div class="field">
							<TextareaAutogrow
								bind:value={$values.description}
								class="p-2 text-sm sm:min-h-[6rem]"
								id="description"
								name="description"
								placeholder="Description"
							/>
						</div>
					</label>

					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class:hasError={errors.tags}>
						<span>Tags</span>
						<div class="field">
							<ul class="mt-1 flex flex-wrap gap-2 text-sm">
								{#each $values.tags || [] as tag (tag)}
									<li class="badge" transition:fade|local>
										{tag}
										<button
											class="mini-circle danger"
											type="button"
											on:click={() => (tags = tags.filter((t) => t !== tag))}
										>
											-
										</button>
									</li>
								{/each}
								<li>
									<TagInputAutocomplete bind:tags={$values.tags} />
								</li>
							</ul>
						</div>
					</label>

					<PageFormErrors />
				</div>

				<div class="flex items-end justify-between max-sm:hidden">
					<button class="btn" type="submit">Add entry</button>
					<button
						type="reset"
						class="rounded bg-slate-700 px-3 py-2 font-normal text-slate-400 transition-colors hover:bg-slate-800"
						on:click={resetAll}
					>
						Start over
					</button>
				</div>
			</div>

			<!-- COL2 -->
			<div class="grid gap-6">
				<div class="pointer-events-none opacity-50 {$youtubeVideoDetails && 'opacity-100'}">
					<h3 class="text-black">Preview</h3>
					<EntryItem entry={$newEntryPreview} />
				</div>

				<div class="flex justify-between sm:hidden">
					<button class="btn" type="submit">Add entry</button>
					<button
						type="reset"
						class="rounded bg-slate-700 px-3 py-2 font-normal text-slate-400 transition-colors hover:bg-slate-800"
						on:click={resetAll}
					>
						Start over
					</button>
				</div>
			</div>
		</fieldset>
	</form>
</div>

<style lang="postcss">
	label.hasError {
		.field {
			@apply rounded shadow-lg ring-2 ring-red-600/70;
		}
	}
</style>
