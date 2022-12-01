<script lang="ts" scope="module">
	import type { Destination } from '$lib/telegram'
	import type { PageData } from './$types'

	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import TextareaAutogrow from '$components/forms/TextareaAutogrow.svelte'
	import { marked } from 'marked'
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'

	export let data: PageData

	$: updates = data.admin.updates

	let message = ''
	let destination: Destination = 'test_group'
	let isFeedbackVisible = false

	let pre: HTMLElement

	const onclick = async () => {
		await invalidateAll()
		pre.scrollTop = pre.scrollHeight
	}

	onMount(() => (pre.scrollTop = pre.scrollHeight))
</script>

<div class="mx-auto max-w-7xl p-4 md:p-0">
	<div class="grid gap-6 md:grid-cols-3">
		<form class="grid h-fit gap-6 md:col-span-2 md:grid-cols-2" use:enhance>
			<div class="md:col-span-2">
				<h1 class="text-xl">Send message</h1>
				<div class="mt-4 flex gap-6">
					<input type="hidden" name="destination" value={destination} />
					<div>
						<label>
							<input type="radio" bind:group={destination} value="test_group" />
							<span class="ml-2">Test group</span>
						</label>
					</div>
					<div>
						<label>
							<input type="radio" bind:group={destination} value="main_group" />
							<span class="ml-2">Main group</span>
						</label>
					</div>
					<div>
						<label>
							<input type="radio" bind:group={destination} value="admin_group" />
							<span class="ml-1">Admin group</span>
						</label>
					</div>
				</div>
			</div>

			<div class="grid h-fit gap-6">
				<div class="grid h-fit gap-6">
					<div class="message">
						<TextareaAutogrow
							bind:value={message}
							id="message"
							name="message"
							placeholder="Message"
						/>
					</div>

					{#if isFeedbackVisible}
						<div class="relative">
							<button
								type="button"
								class="absolute right-2 top-2 opacity-40 transition-opacity hover:opacity-100"
								on:click={() => (isFeedbackVisible = false)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-6 w-6"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
							<pre transition:fade>{JSON.stringify($page.form, null, 2)}</pre>
						</div>
					{/if}

					<div>
						<button
							class="btn"
							type="submit"
							disabled={!message}
							on:click={() => {
								isFeedbackVisible = false
								setTimeout(() => (isFeedbackVisible = true), 500)
							}}
						>
							Send
						</button>
					</div>
				</div>
			</div>

			<div class="preview rounded bg-slate-900 p-2">
				{@html marked(message, { gfm: true, breaks: true })}
			</div>
		</form>
		<div class="grid h-fit  gap-6">
			<div class="">
				<h1 class="text-xl">Bot updates</h1>
			</div>

			<div class="relative w-full overflow-x-auto">
				<button
					class="absolute right-2 top-2 py-1 opacity-40 transition-opacity hover:opacity-100"
					on:click={onclick}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
						/>
					</svg>
				</button>

				<pre bind:this={pre} class="updates overflow-y-auto">{JSON.stringify(
						updates,
						null,
						2
					)}</pre>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.message {
		/* max-width: 16em; */
		@apply text-lg;
	}

	pre {
		max-height: 50vh;
		@apply rounded bg-black/20 p-2 text-xs;
	}

	.preview {
		max-width: 16em;
		min-height: 3em;

		@apply text-lg;

		:global(pre),
		:global(code) {
			white-space: break-spaces;
			/* word-wrap: break-word; */
		}
	}
</style>
