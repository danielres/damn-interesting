<script lang="ts" scope="module">
	import type { PageData } from './$types'

	import { format } from '$lib/date'

	export let data: PageData

	$: user = data.admin.user
</script>

{#if user}
	<div class="mx-auto my-8 grid max-w-xl gap-16">
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
				<div>Last login at:</div>
				<div>{user.lastLoginAt ? format(user.lastLoginAt) : '/'}</div>
				<div>Invited at</div>
				<div>{format(user.invitedAt)}</div>
				<div>Invited by:</div>
				<div>
					{#if user.inviter}
						<a href={`/admin/users/${user.inviter.slug}`}>
							{user.inviter.username}
						</a>
					{:else}
						/
					{/if}
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
							class="block py-2 transition-all hover:bg-black/20"
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
		@apply inline-block rounded bg-black bg-opacity-20 px-1;
		&:hover {
			@apply bg-opacity-40;
		}
	}

	h3 {
		@apply text-xl;
	}
</style>
