<script lang="ts" scope="module">
	import type { PageData } from './$types'

	import { format } from '$lib/date'

	export let data: PageData

	const users = data.admin.users
</script>

<div class="flex flex-wrap gap-2 text-sm">
	{#each users as user}
		<div class="card card py-4 px-4">
			<div class=" grid gap-1">
				<div>
					<b><a href={`/admin/users/${user.slug}`}>{user.username}</a></b>
					[{user.slug}]
				</div>
				<div>{user.email}</div>
				<div>{user.role}</div>
				<div class={user.lastLoginAt ? '' : 'opacity-50'}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="mr-1 inline h-5 w-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>

					{user.lastLoginAt ? format(user.lastLoginAt) : ''}
				</div>
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="mr-1 inline h-5 w-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>

					{format(user.invitedAt)}
				</div>
				{#if user.inviter}
					<div>
						Invited by
						<a href={`/admin/users/${user.inviter.slug}`}>{user.inviter.username}</a>
					</div>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	a {
		@apply inline-block rounded bg-black bg-opacity-20 px-1;
		&:hover {
			@apply bg-opacity-40;
		}
	}
</style>
