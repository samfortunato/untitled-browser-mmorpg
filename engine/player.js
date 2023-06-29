const info = {
  canMove: true,
};

export function setCanPlayerMove(canPlayerMove) {
  info.canMove = canPlayerMove;
}

export function getCanPlayerMove() {
  return info.canMove;
}
