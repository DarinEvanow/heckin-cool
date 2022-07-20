<script lang="ts">
	import {
		CircleBufferGeometry,
		MeshStandardMaterial,
		MeshPhongMaterial,
		BoxBufferGeometry,
		DoubleSide,
		ShaderMaterial,
		MeshLambertMaterial,
		PlaneBufferGeometry
	} from 'three';
	import type { Shader } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import {
		AmbientLight,
		Canvas,
		DirectionalLight,
		Group,
		Mesh,
		OrbitControls,
		PerspectiveCamera,
		useFrame
	} from '@threlte/core';
	import { spring } from 'svelte/motion';

	const scale = spring(1);

	const water = new MeshPhongMaterial({
		color: 'blue',
		transparent: true,
		opacity: 0.5
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

<PerspectiveCamera position={{ x: 15, y: 15, z: 15 }} fov={24}>
	<OrbitControls
		maxPolarAngle={DEG2RAD * 80}
		autoRotate={false}
		enableZoom={false}
		target={{ y: 0.5 }}
	/>
</PerspectiveCamera>

<DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
<AmbientLight intensity={0.666} />

<!-- Cube -->
<Group scale={$scale}>
	<Mesh
		interactive
		on:pointerenter={() => ($scale = 2)}
		on:pointerleave={() => ($scale = 1)}
		position={{ y: 0.5 }}
		castShadow
		geometry={new BoxBufferGeometry(1, 1, 1)}
		material={new MeshStandardMaterial({ color: '#333333' })}
	/>
</Group>

<!-- Water -->
<Mesh
	receiveShadow
	rotation={{ x: -90 * (Math.PI / 180) }}
	geometry={new PlaneBufferGeometry(20, 20, 100, 100)}
	material={water}
/>
