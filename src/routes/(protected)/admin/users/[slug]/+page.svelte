<script lang="ts" scope="module">
	import type { PageData } from './$types'

	import { format } from '$lib/date'

	export let data: PageData

	const user = data.admin.user
</script>

{#if user}
	<div class="max-w-xl mx-auto grid gap-16 my-8">
		<div class="card">
			<div class="grid grid-cols-2 gap-2">
				<div>Username</div>
				<div>{user.username}</div>
				<div>Role</div>
				<div>{user.role}</div>
				<div>Slug</div>
				<div>{user.slug}</div>
				<div>Email</div>
				<div>{user.email}</div>
				<div>Invited at</div>
				<div>{format(user.invitedAt)}</div>
				<div>Invited by</div>
				<div>
					<a href={`/admin/users/${user.inviter.slug}`}>
						{user.inviter.username}
					</a>
				</div>
				<div>Invitees:</div>
				<div class="flex flex-wrap gap-1">
					{#each user.invitees as invitee}
						<a href={`/admin/users/${invitee.slug}`}>
							{invitee.username}
						</a>
					{/each}
				</div>
			</div>
		</div>

		<div class="grid">
			<h3>Entries</h3>

			<div class="grid divide-y divide-white/20">
				{#if user.entries.length > 0}
					{#each user.entries as entry}
						<a
							class="block py-2 hover:bg-black/20 transition-all"
							href={`/admin/entries/${entry.id}`}
						>
							<div class="text-sm opacity-40">{format(entry.createdAt)}</div>
							<div>{entry.title}</div>
						</a>
					{/each}
				{:else}
					<div class="opacity-50">No entries found</div>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<!-- else content here -->
{/if}

<style lang="postcss">
	.card a {
		@apply bg-black inline-block px-1 rounded bg-opacity-20;
		&:hover {
			@apply bg-opacity-40;
		}
	}

	h3 {
		@apply text-xl;
	}
</style>
