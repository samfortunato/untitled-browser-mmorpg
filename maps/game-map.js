import { calculateTileCrop, getTileset } from './tiles.js';

import { TILE_SIZE_RAW, TILE_SIZE_RENDERED } from '../constants/draw.js';

export class GameMap {
  static tilesetName = 'NULL';
  static tiles = [[0]];

  /** @param {CanvasRenderingContext2D} ctx */
  static draw(ctx) {
    for (let y = 0; y < this.tiles.length; y++) {
      for (let x = 0; x < this.tiles[y].length; x++) {
        ctx.drawImage(
          getTileset(this.tilesetName),
          ...calculateTileCrop(this.tilesetName, this.tiles[y][x]),
          TILE_SIZE_RAW, TILE_SIZE_RAW,
          x * TILE_SIZE_RENDERED, y * TILE_SIZE_RENDERED,
          TILE_SIZE_RENDERED, TILE_SIZE_RENDERED
        )
      }
    }
  }
}
