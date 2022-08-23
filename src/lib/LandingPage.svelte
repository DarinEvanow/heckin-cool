<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Floating3DSpace from '$lib/Floating3DSpace.svelte';
	import ScrollContainer from '$lib/ScrollContainer.svelte';
</script>

<div class="background">
	<Canvas>
		<Floating3DSpace />
	</Canvas>
</div>

<ScrollContainer />

<style>
	.background {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background-image: radial-gradient(#fff 1px, transparent 0),
			radial-gradient(#fff 1px, transparent 0);
		background-size: 52px 52px;
		background-position: 0 15px, 26px 40px;
		background-color: rgb(50, 50, 50);
	}
</style>
