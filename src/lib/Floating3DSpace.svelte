<script lang="ts">
	import { BoxGeometry, ConeGeometry, MeshMatcapMaterial, TorusGeometry, Vector3 } from 'three';
	import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
	import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
	import { Instance, InstancedMesh, Mesh, PerspectiveCamera, useTexture } from '@threlte/core';
	import { Float } from '@threlte/extras';
	import { cameraPosition } from '$lib/cameraStore';
	import { scrollY } from '$lib/positionStore';
	import { browser } from '$app/env';

	let innerWidth = 1;

	if (browser) {
		// TODO: Resize this on animation frame or window resize
		// in order to scale text size with window size
		innerWidth = window.innerWidth;
	}

	/**
	 * Logic flags
	 */

	let shouldRender = false;

	/**
	 * Scale
	 */
	let spreadAmount = 30;

	/**
	 * Textures
	 */

	const matcapTexture = useTexture('/textures/matcap.png', {
		onLoad: () => {
			shouldRender = true;
			setTimeout(() => {
				cameraPosition.set(new Vector3(0, 0, 15));
			}, 200);
		}
	});

	/**
	 * Font
	 */

	const fontLoader = new FontLoader();
	let titleGeometry: TextGeometry;
	let seeSomeGeometry: TextGeometry;
	let projectsGeometry: TextGeometry;
	let hearSomeGeometry: TextGeometry;
	let musicGeometry: TextGeometry;
	let madeByGeometry: TextGeometry;
	let guyGeometry: TextGeometry;

	fontLoader.load('/fonts/droid/droid_sans_regular.typeface.json', (font) => {
		titleGeometry = new TextGeometry("Heckin' Cool", {
			font: font,
			size: innerWidth / 1250,
			height: 0.2,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 0.03,
			bevelSize: 0.02,
			bevelOffset: 0,
			bevelSegments: 5
		});
		titleGeometry.center();

		seeSomeGeometry = new TextGeometry('See some', {
			font: font,
			size: 0.4,
			height: 0.2,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 0.03,
			bevelSize: 0.02,
			bevelOffset: 0,
			bevelSegments: 5
		});
		seeSomeGeometry.center();

		projectsGeometry = new TextGeometry('Projects', {
			font: font,
			size: 0.4,
			height: 0.2,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 0.03,
			bevelSize: 0.02,
			bevelOffset: 0,
			bevelSegments: 5
		});
		projectsGeometry.center();

		hearSomeGeometry = new TextGeometry('Hear some', {
			font: font,
			size: 0.4,
			height: 0.2,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 0.03,
			bevelSize: 0.02,
			bevelOffset: 0,
			bevelSegments: 5
		});
		hearSomeGeometry.center();

		musicGeometry = new TextGeometry('Music', {
			font: font,
			size: 0.4,
			height: 0.2,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 0.03,
			bevelSize: 0.02,
			bevelOffset: 0,
			bevelSegments: 5
		});
		musicGeometry.center();

		madeByGeometry = new TextGeometry('Made by a', {
			font: font,
			size: 0.4,
			height: 0.2,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 0.03,
			bevelSize: 0.02,
			bevelOffset: 0,
			bevelSegments: 5
		});
		madeByGeometry.center();

		guyGeometry = new TextGeometry('Guy', {
			font: font,
			size: 0.4,
			height: 0.2,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 0.03,
			bevelSize: 0.02,
			bevelOffset: 0,
			bevelSegments: 5
		});
		guyGeometry.center();
	});

	/**
	 * Material and Geometry
	 */

	const material = new MeshMatcapMaterial({ matcap: matcapTexture });
	const boxGeometry = new BoxGeometry(0.8, 0.8, 0.8);
	const coneGeometry = new ConeGeometry(0.3, 0.8, 30);
	const donutGeometry = new TorusGeometry(0.3, 0.2, 20, 45);
	const projectsUnderlineGeometry = new BoxGeometry(2, 0.1, 0.1);
	const musicUnderlineGeometry = new BoxGeometry(1.4, 0.1, 0.1);
	const guyUnderlineGeometry = new BoxGeometry(0.9, 0.1, 0.1);
</script>

<PerspectiveCamera position={$cameraPosition} fov={24} lookAt={{ x: 0, y: 0, z: 0 }} />

<Mesh geometry={titleGeometry} {material} />
<Mesh geometry={seeSomeGeometry} {material} position={{ x: 0 + $scrollY * 10, y: 2, z: 0 }} />
<Mesh geometry={projectsGeometry} {material} position={{ x: 0 - $scrollY * 10, y: -2, z: 0 }} />
<Mesh
	geometry={projectsUnderlineGeometry}
	{material}
	position={{ x: 0 - $scrollY * 10, y: -2.4, z: 0 }}
/>
<Mesh geometry={hearSomeGeometry} {material} position={{ x: -10 + $scrollY * 10, y: 2, z: 0 }} />
<Mesh geometry={musicGeometry} {material} position={{ x: 10 - $scrollY * 10, y: -2, z: 0 }} />
<Mesh
	geometry={musicUnderlineGeometry}
	{material}
	position={{ x: 10 - $scrollY * 10, y: -2.4, z: 0 }}
/>
<Mesh geometry={madeByGeometry} {material} position={{ x: -20 + $scrollY * 10, y: 2, z: 0 }} />
<Mesh geometry={guyGeometry} {material} position={{ x: 20 - $scrollY * 10, y: -2, z: 0 }} />
<Mesh
	geometry={guyUnderlineGeometry}
	{material}
	position={{ x: 20 - $scrollY * 10, y: -2.4, z: 0 }}
/>

{#if shouldRender}
	<InstancedMesh geometry={donutGeometry} {material}>
		{#each Array(100) as _}
			<Float speed={2}>
				<Instance
					position={{
						x: (Math.random() - 0.5) * spreadAmount,
						y: (Math.random() - 0.5) * spreadAmount,
						z: (Math.random() - 0.5) * spreadAmount
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
						x: (Math.random() - 0.5) * spreadAmount,
						y: (Math.random() - 0.5) * spreadAmount,
						z: (Math.random() - 0.5) * spreadAmount
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
						x: (Math.random() - 0.5) * spreadAmount,
						y: (Math.random() - 0.5) * spreadAmount,
						z: (Math.random() - 0.5) * spreadAmount
					}}
					rotation={{ x: Math.random() * Math.PI, y: Math.random() * Math.PI }}
					scale={Math.random()}
				/>
			</Float>
		{/each}
	</InstancedMesh>
{/if}
