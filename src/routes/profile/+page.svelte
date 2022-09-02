<script lang="ts">
	import FormInviteNewMember from '../../components/forms/FormInviteNewMember.svelte'
	import FormSubmitContent from '../../components/forms/FormSubmitContent.svelte'
	import { userStore } from '../../stores/user'
</script>

<section>
	<div>Username: <b>{$userStore?.username}</b></div>
	<div>Email: <b>{$userStore?.email}</b></div>
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
