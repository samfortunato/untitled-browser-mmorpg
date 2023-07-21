/**
 * @typedef {Object} Boundary
 * @property {number} x
 * @property {number} y
 * @property {number} topRight
 * @property {number} bottomLeft
 * */

/**
 * @param {Boundary} posA
 * @param {Boundary} posB
 */
export function isWithinBoundsOf(posA, posB) {
  return (
    posA.x < posB.x + posB.topRight &&
    posA.x + posA.topRight > posB.x &&
    posA.y < posB.y + posB.bottomLeft &&
    posA.y + posA.bottomLeft > posB.y
  );
}
