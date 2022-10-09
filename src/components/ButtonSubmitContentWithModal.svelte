<script>
	import { invalidateAll } from '$app/navigation'
	import FormSubmitContent from '$components/forms/FormSubmitContent.svelte'
	import Modal from '$components/Modal.svelte'
</script>

<div class="flex justify-center gap-4">
	<Modal let:open let:close>
		<button
			class="flex w-8 h-8 bg-slate-400 hover:bg-slate-200 transition-colors text-slate-900 text-3xl items-center justify-center rounded-full"
			title="Add content"
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
