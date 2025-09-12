/**
 * @typedef {Object} BoundaryOld
 * @property {number} x
 * @property {number} y
 * @property {number} topRight
 * @property {number} bottomLeft
 * */

/**
 * @typedef {Object} Boundary
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 */

/**
 * @param {BoundaryOld} posA
 * @param {BoundaryOld} posB
 */
export function isWithinBoundsOf(posA, posB) {
  return (
    posA.x < posB.x + posB.topRight &&
    posA.x + posA.topRight > posB.x &&
    posA.y < posB.y + posB.bottomLeft &&
    posA.y + posA.bottomLeft > posB.y
  );
}

/**
 * @param {Boundary} boundaryA
 * @param {Boundary} boundaryB
 */
export function isColliding(boundaryA, boundaryB) {
  return (
    boundaryA.x < boundaryB.x + boundaryB.width &&
    boundaryA.x + boundaryA.width > boundaryB.x &&
    boundaryA.y < boundaryB.y + boundaryB.height &&
    boundaryA.y + boundaryA.height > boundaryB.y
  );
}

export function resolveCollision(entityA, entityB) {
  const xOverlap = Math.min(entityA.x + entityA.width, entityB.x + entityB.width) - Math.max(entityA.x, entityB.x);
  const yOverlap = Math.min(entityA.y + entityA.height, entityB.y + entityB.height) - Math.max(entityA.y, entityB.y);

  // Resolve collision along the axis of least overlap
  if (xOverlap < yOverlap) {
    if (entityA.x < entityB.x) {
      entityA.x -= xOverlap / 2;
      entityB.x += xOverlap / 2;
    } else {
      entityA.x += xOverlap / 2;
      entityB.x -= xOverlap / 2;
    }
  } else {
    if (entityA.y < entityB.y) {
      entityA.y -= yOverlap / 2;
      entityB.y += yOverlap / 2;
    } else {
      entityA.y += yOverlap / 2;
      entityB.y -= yOverlap / 2;
    }
  }
}
