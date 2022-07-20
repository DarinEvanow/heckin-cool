<script>
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
</script>

<SC.Canvas antialias background={new THREE.Color('grey')}>
	<SC.Mesh
		geometry={new THREE.BoxGeometry()}
		material={new THREE.MeshStandardMaterial({ color: 'purple' })}
	/>
	<SC.PerspectiveCamera position={[5, 5, 5]} />
	<SC.AmbientLight intensity={0.6} />
	<SC.DirectionalLight intensity={0.6} position={[-2, 3, 2]} />

	<SC.Group position={[0, -0.5, 0]}>
		<SC.Mesh
			geometry={new THREE.PlaneGeometry(50, 50)}
			material={new THREE.MeshStandardMaterial({ color: 'burlywood' })}
			rotation={[-Math.PI / 2, 0, 0]}
		/>

		<SC.Primitive
			object={new THREE.GridHelper(50, 50, 0x444444, 0x555555)}
			position={[0, 0.001, 0]}
		/>
	</SC.Group>
</SC.Canvas>
