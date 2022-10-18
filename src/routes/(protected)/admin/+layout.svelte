<script lang="ts" scope="module">
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { USER_ROLES } from '$constants'

	if (browser && $page.data.user.role !== USER_ROLES.SUPERADMIN) goto('/')
	if (browser && $page.url.pathname === '/admin') goto('/admin/users')
</script>

{#if $page.data.user.role === USER_ROLES.SUPERADMIN}
	<div class="admin">
		<nav class="bg-red-700/20 p-4">
			<ul class="flex">
				<li><a href="/admin/users">Users</a></li>
				<li><a href="/admin/entries">Entries</a></li>
				<li><a href="/admin/tags">Tags</a></li>
				<li class="ml-auto opacity-50"><a href="/admin/operations">Operations</a></li>
			</ul>
		</nav>
		<div class="py-4 md:px-8">
			<slot />
		</div>
	</div>
{/if}

<style lang="postcss">
	nav a {
		@apply p-4;

		&:hover {
			@apply underline underline-offset-4;
		}
	}
</style>
