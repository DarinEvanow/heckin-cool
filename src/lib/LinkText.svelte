<script lang="ts">
	import { BoxGeometry, MeshBasicMaterial } from 'three';
	import type { Material } from 'three';
	import type { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
	import { Mesh } from '@threlte/core';
	import type { Position } from '@threlte/core';

	export let textGeometry: TextGeometry;
	export let material: Material;
	export let position: Position;
	export let link: string;

	const linkMaterial = new MeshBasicMaterial({ opacity: 0, transparent: true });

	// TODO: make sure that TextGeometry is loaded before computing the bounding box
	if (textGeometry) {
		textGeometry.computeBoundingBox();
	}

	const width = textGeometry?.boundingBox?.max?.x - textGeometry?.boundingBox?.min?.x;
	const height = textGeometry?.boundingBox?.max?.y - textGeometry?.boundingBox?.min?.y;
	const depth = textGeometry?.boundingBox?.max?.z - textGeometry?.boundingBox?.min?.z;

	const clickHandlerGeometry = new BoxGeometry(width + 0.1, height + 0.3, depth);

	let underlineGeometry = new BoxGeometry(width, 0.1, depth);
</script>

{#if textGeometry}
	<Mesh geometry={textGeometry} {material} {position} />
	<Mesh
		geometry={underlineGeometry}
		{material}
		position={{ ...position, y: position.y - 0.1 - height / 2 }}
	/>
	<Mesh
		geometry={clickHandlerGeometry}
		material={linkMaterial}
		position={{ ...position, y: position.y - 0.1, z: position.z + 0.1 }}
		interactive
		on:click={() => window.open(link, '_blank')}
		on:pointerenter={() => (document.body.style.cursor = 'pointer')}
		on:pointerleave={() => (document.body.style.cursor = 'default')}
	/>
{/if}
