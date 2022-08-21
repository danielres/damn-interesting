<div class="row">
	<slot />
</div>

<style>
	.row {
		margin-bottom: 10px;
	}

	.row :global(input) {
		border: none;
		background: #eee;
		padding: 0.5em 0.75em;
	}

	.row :global(button) {
		border: none;
		padding: 0.5em 0.75em;
		cursor: pointer;
		background: #ccc;
		opacity: 0.7;
	}
	.row :global(button):hover {
		opacity: 1;
	}
</style>
