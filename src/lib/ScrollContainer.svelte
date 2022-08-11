<script lang="ts">
	import { onMount } from 'svelte';
	import { scrollY } from '$lib/positionStore';

	onMount(() => {
		window.addEventListener('scroll', () => {
			scrollY.set(window.scrollY);
		});
	});
</script>

<div id="scroll-container" />

<style>
	#scroll-container {
		height: 100vw;
	}
</style>
