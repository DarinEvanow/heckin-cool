import { tweened } from 'svelte/motion';
import { backOut } from 'svelte/easing';
import { Vector3 } from 'three';

export const tweenedOptions = {
	duration: 3000,
	easing: backOut
};

export const initialCameraPosition = new Vector3(50, 50, 80);

export const cameraPosition = tweened(initialCameraPosition, tweenedOptions);
