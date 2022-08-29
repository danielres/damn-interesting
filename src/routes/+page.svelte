<script>
	import FormInviteNewMember from '../components/forms/FormInviteNewMember.svelte'
	import { entries } from '../data'
</script>

{#each entries as entry}
	<div>{entry.url}</div>
{/each}

<hr />
<h3>Invite a new member</h3>
<FormInviteNewMember />
