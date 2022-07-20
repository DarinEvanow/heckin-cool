<script>
	import {
		CircleBufferGeometry,
		MeshStandardMaterial,
		MeshPhongMaterial,
		BoxBufferGeometry,
		DoubleSide,
		ShaderMaterial,
		MeshLambertMaterial
	} from 'three';
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

	const mat = new MeshLambertMaterial({
		color: 'green',
		transparent: true,
		opacity: 0.5
	});

	let matShader;

	mat.onBeforeCompile = (shader) => {
		shader.uniforms.time = { value: 0 };
		shader.vertexShader =
			`
        uniform float time;
    ` + shader.vertexShader;

		const token = '#include <begin_vertex>';
		const customTransform = `
        vec3 transformed = vec3(position);
        float freq = 3.0;
        float amp = 0.1;
        float angle = (time + position.x)*freq;
        transformed.z += sin(angle)*amp;
    `;
		shader.vertexShader = shader.vertexShader.replace(token, customTransform);
		matShader = shader;
	};

	let morph = 0;

	useFrame(() => {
		if (matShader) matShader.uniforms.time.value = morph++ * 0.05;
	});
</script>

<PerspectiveCamera position={{ x: 10, y: 10, z: 10 }} fov={24}>
	<OrbitControls
		maxPolarAngle={DEG2RAD * 80}
		autoRotate={false}
		enableZoom={false}
		target={{ y: 0.5 }}
	/>
</PerspectiveCamera>

<DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
<DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.2} />
<AmbientLight intensity={0.2} />

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
	geometry={new CircleBufferGeometry(3, 72)}
	material={mat}
/>
