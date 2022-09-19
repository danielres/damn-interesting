<script lang="ts">
	import { format } from '$lib/date'
	import FormInviteNewMember from '../../../components/forms/FormInviteNewMember.svelte'
	import FormSubmitContent from '../../../components/forms/FormSubmitContent.svelte'
	import { userStore } from '../../../stores/user'
</script>

<section>
	<div>Username: <b>{$userStore?.username}</b></div>
	<div>Email: <b>{$userStore?.email}</b></div>
	<div>
		Invited by: <b>
			<a href={`/user/${$userStore?.invitedBy?.slug}`}>
				{$userStore?.invitedBy?.username}
			</a>
		</b>
	</div>
	{#if $userStore?.invitedAt}
		<div>Invited: <b>{format($userStore?.invitedAt)}</b></div>
	{/if}
</section>

<section>
	<h2>Submit content</h2>
	<FormSubmitContent />
</section>

<section>
	<h2>Invite a new member</h2>
	<FormInviteNewMember />
</section>

<style lang="postcss">
	section {
		@apply my-4 py-4 border-b;
	}
	section h2 {
		@apply text-lg mb-2;
	}
</style>
