<script lang="ts">
	import FormGenerateInvitationCode from '$components/forms/auth/FormGenerateInvitationCode.svelte'
	import FormSubmitContent from '$components/forms/FormSubmitContent.svelte'
	import { format } from '$lib/date'
	import { userStore } from '$stores/user'
</script>

<div class="grid gap-12 my-12 max-w-3xl mx-auto grid-cols-2">
	<section class="col-span-2">
		<h3 class="">Account</h3>
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

	<section class="">
		<h3 class="">Submit content</h3>
		<div class="card bg-slate-900 rounded-none">
			<FormSubmitContent />
		</div>
	</section>

	<section class="">
		<h3 class="">Invite a new member</h3>
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
