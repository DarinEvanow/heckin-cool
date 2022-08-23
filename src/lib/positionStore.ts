import { writable } from 'svelte/store';
import { tweened } from 'svelte/motion';
import { linear } from 'svelte/easing';
import { Vector3 } from 'three';

export const tweenedOptions = {
	duration: 1000,
	easing: linear
};

export const scrollY = writable(0);

export const initialProjectsGeometryPosition = new Vector3(-4, -10, 0);
export const initialMusicGeometryPosition = new Vector3(0, -10, 0);
export const initialGuyGeometryPosition = new Vector3(4, -10, 0);

export const projectsGeometryPosition = tweened(initialProjectsGeometryPosition, tweenedOptions);
export const musicGeometryPosition = tweened(initialProjectsGeometryPosition, tweenedOptions);
export const guyGeometryPosition = tweened(initialProjectsGeometryPosition, tweenedOptions);
