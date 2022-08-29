<div class="outer">
	<div class="inner">
		<slot />
	</div>
</div>

<style>
	:global(body) {
		background: #eee;
	}

	.outer {
		display: flex;
		justify-content: center;
		margin-top: 4em;
	}

	.inner {
		width: 35em;
		padding: 2em;
		background: white;
		border-radius: 10px;
		box-shadow: -5px 5px 20px 0 rgba(0, 0, 0, 0.116);
	}
</style>
