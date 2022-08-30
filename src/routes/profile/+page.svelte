<script lang="ts">
	import FormInviteNewMember from '../../components/forms/FormInviteNewMember.svelte'
	import { userStore } from '../../stores/user'
</script>

<div>
	<div>Username: <b>{$userStore?.username}</b></div>
	<div>Email: <b>{$userStore?.email}</b></div>
</div>

<hr />
<h3>Invite a new member</h3>
<FormInviteNewMember />
