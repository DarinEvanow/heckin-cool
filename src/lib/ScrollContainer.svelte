<script lang="ts">
	import { onMount } from 'svelte';
	import { scrollY } from '$lib/positionStore';

	onMount(() => {
		window.addEventListener('scroll', () => {
			scrollY.set(
				(window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 2
			);
		});
	});
</script>

<div id="scroll-container" />

<style>
	#scroll-container {
		height: 200vh;
	}
</style>
