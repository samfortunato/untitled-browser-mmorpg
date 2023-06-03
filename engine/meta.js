import { Transform } from '../components/transform.js';
import { Collider } from '../components/collider.js';

const playerTransform = new Transform();
const playerCollider = new Collider();

export function getPlayerTransform() {
  return { ...playerTransform };
}

export function getPlayerCollider() {
  return { ...playerCollider };
}

/** @param {Transform} transform */
export function setPlayerTransform(transform) {
  playerTransform.x = transform.x;
  playerTransform.y = transform.y;
  playerTransform.z = transform.z;
}

/** @param {Collider} collider */
export function setPlayerCollider(collider) {
  playerCollider.topLeft = collider.topLeft;
  playerCollider.topRight = collider.topRight;
  playerCollider.bottomRight = collider.bottomRight;
  playerCollider.bottomLeft = collider.bottomLeft;
}
