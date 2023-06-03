export function isWithinBoundsOf(posA, posB) {
  return (
    posA.x < posB.x + posB.topRight &&
    posA.x + posA.topRight > posB.x &&
    posA.y < posB.y + posB.bottomLeft &&
    posA.y + posA.bottomLeft > posB.y
  );
}
