<script lang="ts">
	import { l, MeshPhongMaterial, PlaneBufferGeometry } from 'three';
	import type { Shader } from 'three';
	import {
		AmbientLight,
		DirectionalLight,
		Group,
		Mesh,
		PerspectiveCamera,
		useFrame
	} from '@threlte/core';
	import { Text } from '@threlte/extras';
	import { spring } from 'svelte/motion';

	const scale = spring(1);
	const title = "Heckin'\nCool";

	const water = new MeshPhongMaterial({
		color: 'blue',
		transparent: true,
		opacity: 0.7
	});

	let waterShader: Shader;

	water.onBeforeCompile = (shader) => {
		shader.uniforms.time = { value: 0 };
		shader.vertexShader =
			`
        uniform float time;
    ` + shader.vertexShader;

		const token = '#include <begin_vertex>';
		const customTransform = `
			vec3 transformed = vec3(position);
			float dx = position.x;
			float dy = position.y;
			float freq = sqrt(dx*dx + dy*dy);
			float amp = 0.1;
			float angle = -time*10.0+freq*6.0;
			transformed.z += sin(angle)*amp;

			objectNormal = normalize(vec3(0.0,-amp * freq * cos(angle),1.0));
			vNormal = normalMatrix * objectNormal;
    `;
		shader.vertexShader = shader.vertexShader.replace(token, customTransform);
		waterShader = shader;
	};

	let morph = 0;

	useFrame(() => {
		if (waterShader) waterShader.uniforms.time.value = morph++ / 100;
	});
</script>

<PerspectiveCamera position={{ x: 15, y: 15, z: 15 }} fov={24} lookAt={{ x: 0, y: 0, z: 0 }} />
<DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
<AmbientLight intensity={0.666} />

<!-- Text -->
<Group scale={$scale}>
	<Text
		interactive
		on:pointerenter={() => ($scale = 2)}
		on:pointerleave={() => ($scale = 1)}
		position={{ y: 4 }}
		fontSize={1}
		color="#ff00c1"
		rotation={{ y: Math.PI / 4 }}
		anchorX="center"
		text={title}
		textAlign="center"
	/>
</Group>

<!-- Water -->
<Mesh
	rotation={{ x: -90 * (Math.PI / 180) }}
	geometry={new PlaneBufferGeometry(20, 20, 100, 100)}
	material={water}
/>
