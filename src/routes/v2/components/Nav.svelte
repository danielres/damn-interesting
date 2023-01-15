<script lang="ts">
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import { page as pageStore } from '$app/stores'
	import Icon from '$components/Icon.svelte'
	import { order, q, reload } from '$components2/Entries/$entries'
	import { to } from '$paths'
	import { tick } from 'svelte'
	import { fade } from 'svelte/transition'
	import { auth } from '../auth/$auth'

	$: console.log($order)

	$: {
		$order, $q
		searchInputValue = $q
		if (browser) reload()
	}

	let searchInput: HTMLInputElement
	let searchInputValue = $q

	const onSearch = () => {
		if (searchInputValue) $pageStore.url.searchParams.set('q', searchInputValue)
		else $pageStore.url.searchParams.delete('q')
		goto(to.entries() + $pageStore.url.search, { keepFocus: true })
	}

	const onSwitchOrder = async () => {
		$order !== 'asc'
			? $pageStore.url.searchParams.set('order', 'asc')
			: $pageStore.url.searchParams.delete('order')
		await tick()
		goto(to.entries() + $pageStore.url.search, { keepFocus: true })
	}

	const cancelSearch = () => {
		searchInputValue = ''
		onSearch()
	}

	const onKeyDown: svelte.JSX.KeyboardEventHandler<EventTarget> = ({ key }) => {
		const searchInputFocused = document.activeElement === searchInput
		if (searchInputFocused && key === 'Escape') cancelSearch()
	}

	$: isSearchActive = ($q || '').length > 0 && $q === searchInputValue

	let isUserMenuOpen = false
</script>

<svelte:window on:keydown={onKeyDown} />
<nav class="border-b-4 border-black bg-slate-900 py-4 px-2 md:px-6">
	<!-- COL1 -->
	<form
		class="flex w-72"
		title="Search tags, titles and descriptions"
		on:submit|preventDefault={onSearch}
	>
		<div class="relative">
			<input
				bind:this={searchInput}
				autocomplete="off"
				type="text"
				class="searchInput {isSearchActive && 'active'}"
				name={searchInputValue ? 'q' : ''}
				bind:value={searchInputValue}
			/>
			{#if searchInputValue}
				<div class="absolute right-2 top-0 bottom-0 flex items-center">
					<button
						class="h-5 w-5 rounded-full {isSearchActive
							? 'animate-pulse bg-blue-200 text-blue-900'
							: 'bg-slate-500 text-slate-900'}  "
						type="button"
						on:click={cancelSearch}
						disabled={!searchInputValue}
						title="Clear filters"
					>
						<Icon type="close" class="" />
					</button>
				</div>
			{/if}
		</div>
		<button class="btn rounded-none" type="submit">
			<Icon type="search" />
		</button>
		<button
			class="btn rounded-l-none border-l border-slate-900 "
			type="button"
			title="Switch to {$order !== 'asc' ? 'oldest' : 'newest'} first"
			on:click|preventDefault={onSwitchOrder}
		>
			<Icon type={$order !== 'asc' ? 'bars-arrow-up' : 'bars-arrow-down'} />
		</button>
	</form>

	<!-- COL2 -->
	<div class="{searchInputValue && 'max-sm:hidden'} flex items-center justify-center">
		<a
			href="{to.entries()}/add{$pageStore.url.search}"
			data-sveltekit-noscroll
			class="flex aspect-square w-auto items-center justify-center rounded-full bg-slate-400 px-2  text-slate-900 opacity-50 transition-opacity hover:opacity-100"
			title="Add an entry"
		>
			<Icon type="plus" />
		</a>
	</div>

	<!-- COL3 -->
	<div class="{searchInputValue && 'max-sm:hidden'} flex flex-grow justify-end gap-2 md:gap-6">
		<a
			href={to.about()}
			class="flex aspect-square items-center justify-center rounded-full bg-slate-700 px-2 text-white opacity-50 transition-opacity hover:opacity-100"
			data-sveltekit-noscroll
		>
			<Icon type="info" />
		</a>
		<div class="flex">
			<button
				type="button"
				on:click|preventDefault={() => (isUserMenuOpen = !isUserMenuOpen)}
				class="flex aspect-square w-auto items-center justify-center rounded-l-full bg-slate-700 px-2 text-white opacity-50 transition-opacity hover:opacity-100"
			>
				<Icon type="user" />
			</button>
			<div class="border-r border-slate-900" />

			<button
				type="button"
				class="flex aspect-square w-auto items-center justify-center rounded-r-full bg-slate-700 px-2 text-white opacity-50 transition-opacity hover:opacity-100"
				on:click={auth.signout}
			>
				<Icon type="logout" />
			</button>
		</div>
	</div>
</nav>

{#if isUserMenuOpen}
	<div
		transition:fade
		class="relative -top-1 ml-auto  max-w-[16rem] rounded-bl border-4 border-t-0 border-r-0 border-black bg-slate-900 px-4 pt-0.5 pb-4 shadow-lg"
	>
		<ul>
			{#each ['one', 'two', 'three', 'four'] as word}
				<li>
					<a class="block px-6 py-4 hover:bg-slate-700" href="#">{word}</a>
				</li>
			{/each}
		</ul>
	</div>
{/if}

<style lang="postcss">
	nav {
		@apply flex gap-4;
		@screen sm {
			display: grid;
			grid-template-columns: 1fr auto 1fr;
		}
	}

	input.searchInput {
		@apply rounded-r-none border border-slate-300 pr-16;
		@apply focus:ring-inset;
		&.active {
			@apply bg-blue-400/50 text-blue-100;
		}
	}

	button {
		@apply opacity-70 transition-opacity;
	}
	button:not(:disabled) {
		@apply hover:opacity-100;
	}

	.btn,
	input {
		@apply max-sm:px-2 max-sm:py-2;
	}
</style>
