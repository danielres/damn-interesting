<script lang="ts" scope="module">
	import type { PageData } from './$types'

	import { format } from '$lib/date'

	export let data: PageData

	const users = data.admin.users
</script>

<div class="flex gap-2 flex-wrap text-sm">
	{#each users as user}
		<div class="card card py-4 px-4">
			<div class=" grid gap-1">
				<div><b><a href={`/admin/users/${user.slug}`}>{user.username}</a></b> [{user.slug}]</div>
				<div>{user.email}</div>
				<div>{user.role}</div>
				<div>{format(user.invitedAt)}</div>
				<div>
					Invited by <a href={`/admin/users/${user.inviter.slug}`}>{user.inviter.username}</a>
				</div>
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	a {
		@apply bg-black inline-block px-1 rounded bg-opacity-20;
		&:hover {
			@apply bg-opacity-40;
		}
	}
</style>
