<script lang="ts">
	import { BoxGeometry, ConeGeometry, MeshMatcapMaterial, TorusGeometry, Vector3 } from 'three';
	import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
	import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
	import { Instance, InstancedMesh, Mesh, PerspectiveCamera, useTexture } from '@threlte/core';
	import { Float } from '@threlte/extras';
	import { cameraPosition } from '$lib/cameraStore';
	import { scrollY } from '$lib/positionStore';
	import LinkText from '$lib/LinkText.svelte';
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

	let texturesLoaded = false;
	let fontsLoaded = false;
	$: shouldRender = texturesLoaded && fontsLoaded;

	/**
	 * Scale
	 */
	let spreadAmount = 30;

	/**
	 * Textures
	 */

	const matcapTexture = useTexture('/textures/matcap.png', {
		onLoad: () => {
			texturesLoaded = true;
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
		projectsGeometry.computeBoundingBox();

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
		musicGeometry.computeBoundingBox();

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
		guyGeometry.computeBoundingBox();

		fontsLoaded = true;
	});

	/**
	 * Material and Geometry
	 */

	const material = new MeshMatcapMaterial({ matcap: matcapTexture });
	const boxGeometry = new BoxGeometry(0.8, 0.8, 0.8);
	const coneGeometry = new ConeGeometry(0.3, 0.8, 30);
	const donutGeometry = new TorusGeometry(0.3, 0.2, 20, 45);
</script>

<PerspectiveCamera position={$cameraPosition} fov={24} lookAt={{ x: 0, y: 0, z: 0 }} />

{#if shouldRender}
	<Mesh geometry={titleGeometry} {material} />

	<Mesh geometry={seeSomeGeometry} {material} position={{ x: 0 + $scrollY * 10, y: 2, z: 0 }} />
	<LinkText
		textGeometry={projectsGeometry}
		{material}
		position={{ x: 0 - $scrollY * 10, y: -2, z: 0 }}
		link="https://www.github.com/DarinEvanow"
	/>

	<Mesh geometry={hearSomeGeometry} {material} position={{ x: -10 + $scrollY * 10, y: 2, z: 0 }} />
	<LinkText
		textGeometry={musicGeometry}
		{material}
		position={{ x: 10 - $scrollY * 10, y: -2, z: 0 }}
		link="https://trashvampires.bandcamp.com/"
	/>

	<Mesh geometry={madeByGeometry} {material} position={{ x: -20 + $scrollY * 10, y: 2, z: 0 }} />
	<LinkText
		textGeometry={guyGeometry}
		{material}
		position={{ x: 20 - $scrollY * 10, y: -2, z: 0 }}
		link="https://www.linkedin.com/in/darinevanow/"
	/>

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
