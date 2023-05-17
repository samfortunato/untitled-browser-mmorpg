export function isWithinBoundsOf(posA, posB) {
  return (
    posA.x >= posB.x &&
    posA.x <= posB.x + posB.bounds.topRight &&
    posA.y >= posB.y &&
    posA.y <= posB.y + posB.bounds.bottomLeft
  );
}
