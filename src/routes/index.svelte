<script lang="ts">
	import LandingPage from '$lib/LandingPage.svelte';
</script>

<div>
	<LandingPage />
</div>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		font-size: 100%;
		vertical-align: baseline;
		background: transparent;
	}

	div {
		height: 100vh;
		width: 100vw;
		background-image: radial-gradient(#fff 1px, transparent 0),
			radial-gradient(#fff 1px, transparent 0);
		background-size: 52px 52px;
		background-position: 0 15px, 26px 40px;
		background-color: rgb(50, 50, 50);
	}
</style>
