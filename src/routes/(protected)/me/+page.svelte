<script lang="ts">
	import { dev } from '$app/environment'
	import FormGenerateInvitationCode from '$components/forms/auth/FormGenerateInvitationCode.svelte'
	import FormSubmitContent from '$components/forms/FormSubmitContent.svelte'
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

<div class="grid gap-12 my-12 max-w-3xl mx-auto md:grid-cols-2">
	{#if dev}
		<section class="md:col-span-2">
			<h3 class="text-violet-400">Dev</h3>
			<form class="card bg-violet-500/50" on:submit|preventDefault={() => seed()}>
				<button class="btn bg-purple-500 hover:bg-purple-400">Insert contents</button>
			</form>
		</section>
	{/if}

	<section class="md:col-span-2">
		<h3>Account</h3>
		<div class="card bg-slate-700 rounded-none grid grid-cols-2 gap-y-2 text-sm">
			<div>Username</div>
			<div><b>{$userStore?.username}</b></div>
			<div>Email</div>
			<div><b>{$userStore?.email}</b></div>
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
