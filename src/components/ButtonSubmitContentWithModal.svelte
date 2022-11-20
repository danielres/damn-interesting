<script>
	import { invalidateAll } from '$app/navigation'
	import FormSubmitContent from '$components/forms/FormSubmitContent.svelte'
	import Modal from '$components/Modal.svelte'
</script>

<div class="flex justify-center gap-4">
	<Modal let:open let:close>
		<button
			class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-400 text-3xl text-slate-900 transition-colors hover:bg-slate-200"
			title="Add content"
			disabled
			on:click={open}
		>
			+
		</button>

		<div slot="content" class="grid gap-4">
			<h3 class="text-xl">Submit new content</h3>
			<FormSubmitContent
				autofocus={true}
				onSuccess={() => {
					invalidateAll()
					close()
				}}
			/>
		</div>
	</Modal>
</div>
