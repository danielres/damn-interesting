<script lang="ts">
	import FormGenerateInvitationCode from '$components/forms/auth/FormGenerateInvitationCode.svelte'
	import FormSubmitContent from '$components/forms/FormSubmitContent.svelte'
	import { USER_ROLES } from '$constants'
	import * as seeds from '$dev/seeds'
	import { format } from '$lib/date'
	import { userStore } from '$stores/user'

	const seed = async () => {
		const promises = seeds.entries.map((data) =>
			fetch('/api/content', { method: 'POST', body: JSON.stringify(data) })
		)
		await Promise.all(promises)
	}
</script>

{#if $userStore?.role === USER_ROLES.SUPERADMIN}
	<section class="px-6 pt-6 grid">
		<div class="ml-auto">
			<a href="/admin" class="btn bg-red-500 opacity-60 hover:opacity-100">Admin</a>
			<form class="inline-block " on:submit|preventDefault={() => seed()}>
				<button class="btn bg-purple-500 hover:bg-purple-400">Insert contents</button>
			</form>
		</div>
	</section>
{/if}

<div class="grid gap-12 my-12 max-w-3xl mx-auto md:grid-cols-2">
	<section class="md:col-span-2">
		<h3>Account</h3>
		<div class="card bg-slate-700 rounded-none grid grid-cols-2 gap-y-2 text-sm">
			<div>Username</div>
			<div><b>{$userStore?.username}</b></div>
			<div>Email</div>
			<div><b>{$userStore?.email}</b></div>
			<div>Role</div>
			<div><b>{$userStore?.role}</b></div>
			<div>Invited by</div>
			<div>
				<b>
					<a href={`/user/${$userStore?.inviter?.slug}`}>
						{$userStore?.inviter?.username}
					</a>
				</b>
			</div>
			{#if $userStore?.invitedAt}
				<div>Invited</div>
				<div><b>{format($userStore?.invitedAt)}</b></div>
			{/if}
		</div>
	</section>

	<section>
		<h3>Submit content</h3>
		<div class="card bg-slate-900 rounded-none">
			<FormSubmitContent />
		</div>
	</section>

	<section>
		<h3>Invite a new member</h3>
		<div class="card bg-slate-900 rounded-none">
			<FormGenerateInvitationCode />
		</div>
	</section>
</div>

<style lang="postcss">
	h3 {
		@apply drop-shadow-sharp ml-1 text-xl opacity-80;
	}
</style>
