import { calculateTileCrop, getTileset } from './tiles.js';

import { TILE_SIZE_RAW, TILE_SIZE_RENDERED } from '../constants/draw.js';
import { getScreenDimensions } from '../engine/draw.js';

export class GameMap {
  static tilesetName = 'NULL';
  static tiles = [[0]];

  static get size() {
    return {
      w: (this.tiles[0]?.length ?? 1) * TILE_SIZE_RENDERED,
      h: this.tiles.length * TILE_SIZE_RENDERED,
    };
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} camX
   * @param {number} camY
   */
  static draw(ctx, camX = 0, camY = 0) {
    const { w: screenW, h: screenH } = getScreenDimensions();

    const startX = Math.max(0, Math.floor(camX / TILE_SIZE_RENDERED));
    const startY = Math.max(0, Math.floor(camY / TILE_SIZE_RENDERED));
    const endX = Math.min(this.tiles[0]?.length ?? 1, Math.ceil((camX + screenW) / TILE_SIZE_RENDERED) + 1);
    const endY = Math.min(this.tiles.length, Math.ceil((camY + screenH) / TILE_SIZE_RENDERED) + 1);

    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
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
