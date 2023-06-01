import { Transform } from '../components/transform.js';

const playerTransform = new Transform();

export function getPlayerPos() {
  return { ...playerTransform };
}

/** @param {Transform} transform */
export function setPlayerPos(transform) {
  playerTransform.x = transform.x;
  playerTransform.y = transform.y;
  playerTransform.z = transform.z;
}
