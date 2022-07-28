<script lang="ts">
	import { MeshMatcapMaterial, TextureLoader, TorusGeometry, Vector3 } from 'three';
	import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
	import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
	import { Mesh, PerspectiveCamera, OrbitControls } from '@threlte/core';
	import { Float } from '@threlte/extras';
	import { cameraPosition } from '$lib/cameraStore';

	/**
	 * Textures
	 */

	const textureLoader = new TextureLoader();
	const matcapTexture = textureLoader.load('/textures/matcap.png');

	/**
	 * Fonts
	 */

	const fontLoader = new FontLoader();

	let textGeometry: TextGeometry;

	fontLoader.load('/fonts/gentilis_regular.typeface.json', (font) => {
		textGeometry = new TextGeometry("Heckin' Cool", {
			font: font,
			size: 0.5,
			height: 0.2,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 0.03,
			bevelSize: 0.02,
			bevelOffset: 0,
			bevelSegments: 5
		});

		textGeometry.center();
	});

	const material = new MeshMatcapMaterial({ matcap: matcapTexture });
	const donutGeometry = new TorusGeometry(0.3, 0.2, 20, 45);
	cameraPosition.set(new Vector3(5, 5, 15));
</script>

<PerspectiveCamera position={$cameraPosition} fov={24} lookAt={{ x: 0, y: 0, z: 0 }}>
	<OrbitControls enableZoom={false} />
</PerspectiveCamera>

<Mesh geometry={textGeometry} {material} />
{#each Array(300) as _}
	<Float speed={2}>
		<Mesh
			geometry={donutGeometry}
			{material}
			position={{
				x: (Math.random() - 0.5) * 20,
				y: (Math.random() - 0.5) * 20,
				z: (Math.random() - 0.5) * 20
			}}
			rotation={{ x: Math.random() * Math.PI, y: Math.random() * Math.PI }}
			scale={Math.random()}
		/>
	</Float>
{/each}
