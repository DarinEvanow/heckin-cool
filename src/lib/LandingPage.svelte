<script lang="ts">
	import { BoxGeometry, ConeGeometry, MeshMatcapMaterial, TorusGeometry, Vector3 } from 'three';
	import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
	import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
	import {
		Instance,
		InstancedMesh,
		Mesh,
		OrbitControls,
		PerspectiveCamera,
		useTexture
	} from '@threlte/core';
	import { Float } from '@threlte/extras';
	import { cameraPosition } from '$lib/cameraStore';

	/**
	 * Logic flags
	 */

	let shouldRender = false;

	/**
	 * Textures
	 */

	const matcapTexture = useTexture('/textures/matcap.png', {
		onLoad: () => {
			shouldRender = true;
			setTimeout(() => {
				cameraPosition.set(new Vector3(5, 5, 15));
			}, 200);
		}
	});

	/**
	 * Font
	 */

	const fontLoader = new FontLoader();
	let textGeometry: TextGeometry;

	fontLoader.load('/fonts/droid/droid_sans_regular.typeface.json', (font) => {
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

	/**
	 * Material and Geometry
	 */

	const material = new MeshMatcapMaterial({ matcap: matcapTexture });
	const boxGeometry = new BoxGeometry(0.8, 0.8, 0.8);
	const coneGeometry = new ConeGeometry(0.3, 0.8, 30);
	const donutGeometry = new TorusGeometry(0.3, 0.2, 20, 45);
</script>

<PerspectiveCamera position={$cameraPosition} fov={24} lookAt={{ x: 0, y: 0, z: 0 }}>
	<OrbitControls enableZoom={false} />
</PerspectiveCamera>

<Mesh geometry={textGeometry} {material} />

{#if shouldRender}
	<InstancedMesh geometry={donutGeometry} {material}>
		{#each Array(100) as _}
			<Float speed={2}>
				<Instance
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
	</InstancedMesh>

	<InstancedMesh geometry={boxGeometry} {material}>
		{#each Array(100) as _}
			<Float speed={2}>
				<Instance
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
	</InstancedMesh>

	<InstancedMesh geometry={coneGeometry} {material}>
		{#each Array(100) as _}
			<Float speed={2}>
				<Instance
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
	</InstancedMesh>
{/if}
