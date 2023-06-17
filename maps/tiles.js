export const TILESETS = {
  NULL: new Image(),
  FIELD: new Image(),
};

TILESETS.NULL.src = './assets/tilesets/null.gif';
TILESETS.FIELD.src = './assets/tilesets/field.gif';

export function getTileset(tilesetName) {
  return TILESETS[tilesetName];
}

/**
 * @param {string} tilesetName
 * @param {number} tileId
 *
 * @returns {[number, number]}
 * */
export function calculateTileCrop(tilesetName, tileId) {
  const tileset = TILESETS[tilesetName];

  const x = (tileId * 16) % tileset.width;
  const y = Math.floor((tileId * 16) / tileset.width) * 16;

  return [x, y];
}
